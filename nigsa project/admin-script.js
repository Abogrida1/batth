// Admin Panel JavaScript

// Store original images for reset functionality
const originalImages = {
    'turkish-coffee': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&h=200&fit=crop',
    'cappuccino': 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=200&fit=crop',
    'latte': 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=300&h=200&fit=crop',
    'green-tea': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop',
    'milkshake': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&h=200&fit=crop',
    'chocolate-cake': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop',
    'about': 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=400&fit=crop'
};

// Store current changes
let imageChanges = {};

// Initialize file input listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeFileInputs();
    loadSavedImages();
});

// Initialize file input listeners for all items
function initializeFileInputs() {
    const fileInputs = document.querySelectorAll('.file-input');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                handleImageUpload(file, this.id.replace('-file', ''));
            }
        });
    });
}

// Handle image upload
function handleImageUpload(file, itemId) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showNotification('يرجى اختيار ملف صورة صحيح', 'error');
        return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showNotification('حجم الصورة يجب أن يكون أقل من 5 ميجابايت', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const imageUrl = e.target.result;
        updateImagePreview(itemId, imageUrl);
        imageChanges[itemId] = imageUrl;
        showNotification(`تم تحديث صورة ${getItemName(itemId)} بنجاح`, 'success');
    };
    reader.readAsDataURL(file);
}

// Update image preview
function updateImagePreview(itemId, imageUrl) {
    const imgElement = document.getElementById(`${itemId}-img`);
    if (imgElement) {
        imgElement.src = imageUrl;
        imgElement.parentElement.classList.add('success-animation');
        setTimeout(() => {
            imgElement.parentElement.classList.remove('success-animation');
        }, 600);
    }
}

// Reset image to original
function resetImage(itemId) {
    const originalUrl = originalImages[itemId];
    if (originalUrl) {
        updateImagePreview(itemId, originalUrl);
        delete imageChanges[itemId];
        showNotification(`تم إعادة تعيين صورة ${getItemName(itemId)}`, 'info');
    }
}

// Get item name in Arabic
function getItemName(itemId) {
    const names = {
        'turkish-coffee': 'القهوة التركية',
        'cappuccino': 'الكابتشينو',
        'latte': 'اللاتيه',
        'green-tea': 'الشاي الأخضر',
        'milkshake': 'الميلك شيك',
        'chocolate-cake': 'كيك الشوكولاتة',
        'about': 'صورة قسم من نحن'
    };
    return names[itemId] || itemId;
}

// Preview changes
function previewChanges() {
    if (Object.keys(imageChanges).length === 0) {
        showNotification('لا توجد تغييرات لمعاينتها', 'info');
        return;
    }

    // Open preview in new window
    const previewWindow = window.open('index.html', '_blank');
    previewWindow.addEventListener('load', function() {
        // Apply changes to preview window
        Object.keys(imageChanges).forEach(itemId => {
            const imgElement = previewWindow.document.querySelector(`[alt="${getItemName(itemId)}"]`);
            if (imgElement) {
                imgElement.src = imageChanges[itemId];
            }
        });
    });

    showNotification('تم فتح معاينة التغييرات في نافذة جديدة', 'success');
}

// Save changes
function saveChanges() {
    if (Object.keys(imageChanges).length === 0) {
        showNotification('لا توجد تغييرات لحفظها', 'info');
        return;
    }

    // Show loading state
    const saveBtn = document.querySelector('.save-btn');
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الحفظ...';
    saveBtn.disabled = true;

    // Simulate saving process
    setTimeout(() => {
        // Save to localStorage for demo purposes
        localStorage.setItem('cafeImageChanges', JSON.stringify(imageChanges));
        
        // Reset button state
        saveBtn.innerHTML = originalText;
        saveBtn.disabled = false;
        
        showNotification('تم حفظ التغييرات بنجاح!', 'success');
        
        // Add success animation to all changed items
        Object.keys(imageChanges).forEach(itemId => {
            const card = document.querySelector(`#${itemId}-img`).closest('.menu-item-card, .about-image-card');
            card.classList.add('success-animation');
            setTimeout(() => {
                card.classList.remove('success-animation');
            }, 600);
        });
    }, 2000);
}

// Load saved images
function loadSavedImages() {
    const savedChanges = localStorage.getItem('cafeImageChanges');
    if (savedChanges) {
        imageChanges = JSON.parse(savedChanges);
        Object.keys(imageChanges).forEach(itemId => {
            updateImagePreview(itemId, imageChanges[itemId]);
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    container.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Drag and drop functionality
document.addEventListener('DOMContentLoaded', function() {
    const imagePreviews = document.querySelectorAll('.image-preview');
    
    imagePreviews.forEach(preview => {
        preview.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.border = '2px dashed #8B4513';
            this.style.backgroundColor = 'rgba(139, 69, 19, 0.1)';
        });
        
        preview.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.border = '';
            this.style.backgroundColor = '';
        });
        
        preview.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.border = '';
            this.style.backgroundColor = '';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                const itemId = this.querySelector('img').id.replace('-img', '');
                handleImageUpload(file, itemId);
            }
        });
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveChanges();
    }
    
    // Ctrl/Cmd + P to preview
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        previewChanges();
    }
    
    // Escape to reset all
    if (e.key === 'Escape') {
        if (confirm('هل تريد إعادة تعيين جميع الصور؟')) {
            resetAllImages();
        }
    }
});

// Reset all images
function resetAllImages() {
    Object.keys(originalImages).forEach(itemId => {
        resetImage(itemId);
    });
    showNotification('تم إعادة تعيين جميع الصور', 'info');
}

// Export changes for main site
function exportChanges() {
    return imageChanges;
}

// Import changes from main site
function importChanges(changes) {
    imageChanges = changes;
    Object.keys(imageChanges).forEach(itemId => {
        updateImagePreview(itemId, imageChanges[itemId]);
    });
}

// Add image compression for better performance
function compressImage(file, maxWidth = 800, quality = 0.8) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = function() {
            const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;
            
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            canvas.toBlob(resolve, 'image/jpeg', quality);
        };
        
        img.src = URL.createObjectURL(file);
    });
}

// Enhanced image upload with compression
async function handleImageUploadWithCompression(file, itemId) {
    try {
        const compressedFile = await compressImage(file);
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            updateImagePreview(itemId, imageUrl);
            imageChanges[itemId] = imageUrl;
            showNotification(`تم تحديث صورة ${getItemName(itemId)} بنجاح`, 'success');
        };
        
        reader.readAsDataURL(compressedFile);
    } catch (error) {
        showNotification('حدث خطأ أثناء معالجة الصورة', 'error');
    }
}

console.log('لوحة الإدارة - تم تحميل النظام بنجاح! 🎛️');
