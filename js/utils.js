// 工具函数模块

// 滚动到指定区域
function scrollToSection(sectionTitle) {
    var elements = document.querySelectorAll('h3');
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].textContent.includes(sectionTitle)) {
            elements[i].scrollIntoView({behavior: 'smooth'});
            break;
        }
    }
}

// 回到顶部
function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// 回到顶部按钮显示/隐藏
function initBackToTop() {
    var backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.display = 'none';
    backToTopButton.onclick = scrollToTop;
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
            backToTopButton.style.opacity = '1';
        } else {
            backToTopButton.style.display = 'none';
            backToTopButton.style.opacity = '0';
        }
    });
}

// 主题切换功能
function initThemeToggle() {
    var themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.title = '切换主题';
    themeToggle.onclick = function() {
        document.body.classList.toggle('dark-theme');
        var icon = this.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    };
    document.body.appendChild(themeToggle);
}

// 键盘事件监听
function initKeyboardEvents() {
    document.addEventListener('keydown', function(e) {
        // 未来可以添加其他快捷键
    });
}

// 点赞系统
function initLikeSystem() {
    var articleCards = document.querySelectorAll('.bg-gray-50');
    articleCards.forEach(function(card) {
        var likeButton = document.createElement('button');
        likeButton.innerHTML = '<i class="far fa-heart"></i>';
        likeButton.className = 'like-btn text-sm text-gray-500 hover:text-red-500 transition duration-300 ml-4';
        likeButton.title = '点赞';
        
        var likeCount = Math.floor(Math.random() * 50) + 10;
        likeButton.onclick = function() {
            var icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.classList.add('text-red-500');
                likeCount++;
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.classList.remove('text-red-500');
                likeCount--;
            }
            this.title = '点赞 (' + likeCount + ')';
        };
        
        var metaDiv = card.querySelector('.flex.items-center.text-sm.text-gray-500');
        if (metaDiv) {
            metaDiv.appendChild(likeButton);
        }
    });
}

// 分享功能
function initShareButtons() {
    var articleCards = document.querySelectorAll('.bg-gray-50');
    articleCards.forEach(function(card) {
        var shareButton = document.createElement('button');
        shareButton.innerHTML = '<i class="fas fa-share-alt"></i>';
        shareButton.className = 'share-btn text-sm text-gray-500 hover:text-blue-500 transition duration-300 ml-4';
        shareButton.title = '分享文章';
        
        shareButton.onclick = function() {
            var title = card.querySelector('h4').textContent;
            var shareText = '分享文章: ' + title;
            
            if (navigator.share) {
                navigator.share({
                    title: title,
                    text: shareText,
                    url: window.location.href
                });
            } else {
                var shareUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText);
                window.open(shareUrl, '_blank');
            }
        };
        
        var metaDiv = card.querySelector('.flex.items-center.text-sm.text-gray-500');
        if (metaDiv) {
            metaDiv.appendChild(shareButton);
        }
    });
}

// 移动端菜单切换
function initMobileMenu() {
    var mobileMenuButton = document.getElementById('mobile-menu-button');
    var mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// 全局函数，用于内联事件处理器
function submitReply(button) {
    var form = button.closest('.reply-form');
    var textarea = form.querySelector('textarea');
    var replyContent = textarea.value.trim();
    
    if (!replyContent) {
        alert('请输入回复内容');
        return;
    }
    
    alert('回复已发送：' + replyContent);
    form.remove();
}

function cancelReply(button) {
    var form = button.closest('.reply-form');
    form.remove();
}

// 导出函数到全局
window.scrollToSection = scrollToSection;
window.scrollToTop = scrollToTop;
window.submitReply = submitReply;
window.cancelReply = cancelReply;
