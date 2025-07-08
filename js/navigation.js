// 导航功能模块

// 导航菜单功能
function initNavigationMenu() {
    var navLinks = document.querySelectorAll('nav a, #mobile-menu a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var text = this.textContent.trim();
            handleNavigation(text);
        });
    });
    
    // 博客标题点击
    var blogTitle = document.querySelector('.fas.fa-blog');
    if (blogTitle) {
        var titleLink = blogTitle.closest('a');
        if (titleLink) {
            titleLink.addEventListener('click', function(e) {
                showBlogInfo();
            });
        }
    }
}

// 显示博客信息
function showBlogInfo() {
    var modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-md w-full m-4 p-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold text-gray-900 flex items-center">
                    <i class="fas fa-blog text-blue-600 mr-2"></i>
                    关于我的博客
                </h2>
                <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="space-y-4">
                <p class="text-gray-600">欢迎来到我的个人博客！这里记录着我在技术学习和生活中的点点滴滴。</p>
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h3 class="font-semibold text-gray-900 mb-2">博客特色</h3>
                    <ul class="text-gray-600 space-y-1">
                        <li>• 前端技术分享</li>
                        <li>• 编程最佳实践</li>
                        <li>• 项目经验总结</li>
                        <li>• 技术趋势分析</li>
                    </ul>
                </div>
                <div class="flex justify-center">
                    <button onclick="closeModal()" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                        开始阅读
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function handleNavigation(page) {
    switch(page) {
        case '首页':
            window.scrollTo({top: 0, behavior: 'smooth'});
            break;
        case '文章':
            scrollToSection('最新文章');
            break;
        case '分类':
            scrollToSection('文章分类统计');
            break;
        case '归档':
            scrollToSection('文章归档');
            break;
        case '关于我':
            scrollToSection('个人简介');
            break;
    }
}

// 初始化各区域图标
function initSectionIcons() {
    // 最新文章标题图标
    var newsIcon = document.querySelector('h3 .fas.fa-newspaper');
    if (newsIcon) {
        newsIcon.style.cursor = 'pointer';
        newsIcon.addEventListener('click', function() {
            showArticleStats();
        });
    }
    
    // 标签云标题图标
    var tagsIcon = document.querySelector('h3 .fas.fa-tags.text-blue-600');
    if (tagsIcon) {
        tagsIcon.style.cursor = 'pointer';
        tagsIcon.addEventListener('click', function() {
            showTagsInfo();
        });
    }
    
    // 评论标题图标
    var commentsIcon = document.querySelector('h3 .fas.fa-comments.text-blue-600');
    if (commentsIcon) {
        commentsIcon.style.cursor = 'pointer';
        commentsIcon.addEventListener('click', function() {
            showCommentsStats();
        });
    }
    
    // 归档标题图标
    var archiveIcon = document.querySelector('h3 .fas.fa-archive');
    if (archiveIcon) {
        archiveIcon.style.cursor = 'pointer';
        archiveIcon.addEventListener('click', function() {
            showArchiveStats();
        });
    }
}

// 显示文章统计
function showArticleStats() {
    var modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-md w-full m-4 p-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold text-gray-900 flex items-center">
                    <i class="fas fa-newspaper text-blue-600 mr-2"></i>
                    文章统计
                </h2>
                <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-blue-50 p-4 rounded-lg text-center">
                        <div class="text-2xl font-bold text-blue-600">25</div>
                        <div class="text-gray-600">总文章数</div>
                    </div>
                    <div class="bg-green-50 p-4 rounded-lg text-center">
                        <div class="text-2xl font-bold text-green-600">12,345</div>
                        <div class="text-gray-600">总阅读量</div>
                    </div>
                    <div class="bg-purple-50 p-4 rounded-lg text-center">
                        <div class="text-2xl font-bold text-purple-600">8</div>
                        <div class="text-gray-600">分类数</div>
                    </div>
                    <div class="bg-orange-50 p-4 rounded-lg text-center">
                        <div class="text-2xl font-bold text-orange-600">156</div>
                        <div class="text-gray-600">评论数</div>
                    </div>
                </div>
                <div class="flex justify-center">
                    <button onclick="closeModal()" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">关闭</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// 显示标签信息
function showTagsInfo() {
    var modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-md w-full m-4 p-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold text-gray-900 flex items-center">
                    <i class="fas fa-tags text-blue-600 mr-2"></i>
                    标签使用统计
                </h2>
                <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="space-y-3">
                <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span class="font-medium">JavaScript</span>
                    <span class="text-blue-600 font-bold">12 篇</span>
                </div>
                <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span class="font-medium">Web开发</span>
                    <span class="text-green-600 font-bold">8 篇</span>
                </div>
                <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span class="font-medium">CSS</span>
                    <span class="text-purple-600 font-bold">6 篇</span>
                </div>
                <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span class="font-medium">编程</span>
                    <span class="text-orange-600 font-bold">5 篇</span>
                </div>
                <div class="flex justify-center mt-4">
                    <button onclick="closeModal()" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">关闭</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// 显示评论统计
function showCommentsStats() {
    var modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-md w-full m-4 p-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold text-gray-900 flex items-center">
                    <i class="fas fa-comments text-blue-600 mr-2"></i>
                    评论统计
                </h2>
                <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="space-y-4">
                <div class="text-center">
                    <div class="text-4xl font-bold text-blue-600 mb-2">156</div>
                    <div class="text-gray-600">总评论数</div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-green-50 p-3 rounded-lg text-center">
                        <div class="text-lg font-bold text-green-600">本月</div>
                        <div class="text-gray-600">23 条</div>
                    </div>
                    <div class="bg-blue-50 p-3 rounded-lg text-center">
                        <div class="text-lg font-bold text-blue-600">本周</div>
                        <div class="text-gray-600">8 条</div>
                    </div>
                </div>
                <div class="flex justify-center">
                    <button onclick="closeModal()" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">关闭</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// 显示归档统计
function showArchiveStats() {
    var modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-md w-full m-4 p-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold text-gray-900 flex items-center">
                    <i class="fas fa-archive text-blue-600 mr-2"></i>
                    归档统计
                </h2>
                <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="space-y-3">
                <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span class="font-medium">2023年10月</span>
                    <span class="text-blue-600 font-bold">8 篇</span>
                </div>
                <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span class="font-medium">2023年9月</span>
                    <span class="text-green-600 font-bold">6 篇</span>
                </div>
                <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span class="font-medium">2023年8月</span>
                    <span class="text-purple-600 font-bold">5 篇</span>
                </div>
                <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span class="font-medium">2023年7月</span>
                    <span class="text-orange-600 font-bold">4 篇</span>
                </div>
                <div class="flex justify-center mt-4">
                    <button onclick="closeModal()" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">关闭</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// 移动端菜单功能
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });
  }
});
