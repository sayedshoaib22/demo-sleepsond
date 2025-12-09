// js/ui-utils.js - UI Helper Functions
// ✅ Better UX with loading states, error handling, and notifications

const UIUtils = {
    // 🔄 Loading States
    loading: {
        show(message = 'Loading...') {
            const existingLoader = document.getElementById('global-loader');
            if (existingLoader) return;

            const loader = document.createElement('div');
            loader.id = 'global-loader';
            loader.innerHTML = `
                <div class="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div class="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center">
                        <div class="w-16 h-16 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p class="text-gray-700 font-medium">${Security.sanitizeInput(message)}</p>
                    </div>
                </div>
            `;
            document.body.appendChild(loader);
        },

        hide() {
            const loader = document.getElementById('global-loader');
            if (loader) {
                loader.remove();
            }
        }
    },

    // 🔔 Notifications (Better than alert)
    notification: {
        show(message, type = 'info', duration = 3000) {
            const colors = {
                success: 'bg-green-500',
                error: 'bg-red-500',
                warning: 'bg-yellow-500',
                info: 'bg-blue-500'
            };

            const icons = {
                success: '✓',
                error: '✕',
                warning: '⚠',
                info: 'ℹ'
            };

            const notification = document.createElement('div');
            notification.className = 'fixed top-4 right-4 z-[300] animate-fade-in';
            notification.innerHTML = `
                <div class="${colors[type]} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 max-w-md">
                    <span class="text-2xl">${icons[type]}</span>
                    <p class="font-medium">${Security.sanitizeInput(message)}</p>
                    <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white/80 hover:text-white">✕</button>
                </div>
            `;

            document.body.appendChild(notification);

            if (duration > 0) {
                setTimeout(() => {
                    notification.style.opacity = '0';
                    notification.style.transform = 'translateX(100%)';
                    setTimeout(() => notification.remove(), 300);
                }, duration);
            }
        },

        success(message) {
            this.show(message, 'success');
        },

        error(message) {
            this.show(message, 'error', 5000);
        },

        warning(message) {
            this.show(message, 'warning');
        },

        info(message) {
            this.show(message, 'info');
        }
    },

    // ❓ Confirmation Dialog (Better than confirm)
    confirm(title, message, onConfirm, onCancel) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-[250] flex items-center justify-center';
        modal.innerHTML = `
            <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            <div class="relative bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 animate-fade-in">
                <h3 class="text-2xl font-bold text-gray-900 mb-4">${Security.sanitizeInput(title)}</h3>
                <p class="text-gray-600 mb-8 leading-relaxed">${Security.sanitizeInput(message)}</p>
                <div class="flex gap-3">
                    <button id="confirm-cancel" class="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        Cancel
                    </button>
                    <button id="confirm-ok" class="flex-1 px-6 py-3 bg-[#FF6B35] text-white rounded-lg font-bold hover:bg-[#e55a2b] transition-colors">
                        Confirm
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('#confirm-ok').addEventListener('click', () => {
            modal.remove();
            if (onConfirm) onConfirm();
        });

        modal.querySelector('#confirm-cancel').addEventListener('click', () => {
            modal.remove();
            if (onCancel) onCancel();
        });

        modal.querySelector('.absolute').addEventListener('click', () => {
            modal.remove();
            if (onCancel) onCancel();
        });
    },

    // 📝 Input Validation UI
    validateInput(inputElement, validationFn, errorMessage) {
        const value = inputElement.value;
        const isValid = validationFn(value);

        // Remove existing error
        const existingError = inputElement.parentElement.querySelector('.validation-error');
        if (existingError) existingError.remove();

        if (!isValid) {
            inputElement.classList.add('border-red-500', 'focus:ring-red-500');
            inputElement.classList.remove('border-gray-300');

            const error = document.createElement('p');
            error.className = 'validation-error text-red-500 text-sm mt-1';
            error.textContent = errorMessage;
            inputElement.parentElement.appendChild(error);
            return false;
        } else {
            inputElement.classList.remove('border-red-500', 'focus:ring-red-500');
            inputElement.classList.add('border-gray-300');
            return true;
        }
    },

    // 🎨 Form Helpers
    form: {
        disable(formElement) {
            const inputs = formElement.querySelectorAll('input, button, select, textarea');
            inputs.forEach(input => input.disabled = true);
        },

        enable(formElement) {
            const inputs = formElement.querySelectorAll('input, button, select, textarea');
            inputs.forEach(input => input.disabled = false);
        },

        getValues(formElement) {
            const formData = new FormData(formElement);
            const values = {};
            for (const [key, value] of formData.entries()) {
                values[key] = value;
            }
            return values;
        },

        reset(formElement) {
            formElement.reset();
            // Remove validation errors
            formElement.querySelectorAll('.validation-error').forEach(el => el.remove());
            formElement.querySelectorAll('input').forEach(input => {
                input.classList.remove('border-red-500', 'focus:ring-red-500');
                input.classList.add('border-gray-300');
            });
        }
    },

    // 🖼️ Image Loading with Lazy Load
    lazyLoadImage(imgElement) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('image-loading');
                    observer.unobserve(img);
                }
            });
        });

        observer.observe(imgElement);
    },

    // 📊 Format Currency
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    },

    // 📅 Format Date
    formatDate(date, format = 'short') {
        const d = new Date(date);
        
        if (format === 'short') {
            return d.toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
        } else if (format === 'long') {
            return d.toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        
        return d.toLocaleDateString('en-IN');
    },

    // ⏱️ Debounce
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // 📱 Detect Mobile
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    // 🔄 Retry Logic
    async retry(fn, maxAttempts = 3, delay = 1000) {
        for (let i = 0; i < maxAttempts; i++) {
            try {
                return await fn();
            } catch (error) {
                if (i === maxAttempts - 1) throw error;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    },

    // 📋 Copy to Clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.notification.success('Copied to clipboard!');
            return true;
        } catch (err) {
            this.notification.error('Failed to copy');
            return false;
        }
    },

    // 🎯 Scroll to Element
    scrollTo(elementId, offset = 80) {
        const element = document.getElementById(elementId);
        if (element) {
            const top = element.offsetTop - offset;
            window.scrollTo({
                top,
                behavior: 'smooth'
            });
        }
    },

    // 🔍 Search Highlight
    highlightSearchTerm(text, searchTerm) {
        if (!searchTerm) return text;
        
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
    },

    // 📊 Generate Order Summary
    generateOrderSummary(items) {
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
        
        return {
            total,
            itemCount,
            formattedTotal: this.formatCurrency(total)
        };
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIUtils;
}
window.UIUtils = UIUtils;