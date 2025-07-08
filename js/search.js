// 搜索功能模块

// 搜索功能初始化
function initSearchFunction() {
    var searchInput = document.querySelector('input[placeholder="搜索文章..."]');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                var searchTerm = this.value.trim();
                performSearch(searchTerm);
            }
        });
        
        // 添加搜索按钮点击事件
        var searchIcon = searchInput.parentElement.querySelector('.fas.fa-search');
        if (searchIcon) {
            searchIcon.style.cursor = 'pointer';
            searchIcon.addEventListener('click', function() {
                var searchTerm = searchInput.value.trim();
                performSearch(searchTerm);
            });
        }
    }
    
    // 搜索区域标题图标点击
    var searchTitleIcon = document.querySelector('h3 .fas.fa-search.text-blue-600');
    if (searchTitleIcon) {
        searchTitleIcon.style.cursor = 'pointer';
        searchTitleIcon.addEventListener('click', function() {
            showSearchTips();
        });
    }
}

// 显示搜索提示
function showSearchTips() {
    var modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-md w-full m-4 p-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold text-gray-900 flex items-center">
                    <i class="fas fa-search text-blue-600 mr-2"></i>
                    搜索技巧
                </h2>
                <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="space-y-4">
                <div class="bg-blue-50 p-4 rounded-lg">
                    <h3 class="font-semibold text-blue-900 mb-2">搜索功能</h3>
                    <ul class="text-blue-800 space-y-1 text-sm">
                        <li>• 支持文章标题搜索</li>
                        <li>• 支持文章内容搜索</li>
                        <li>• 支持标签搜索</li>
                        <li>• 支持作者搜索</li>
                    </ul>
                </div>
                <div class="bg-green-50 p-4 rounded-lg">
                    <h3 class="font-semibold text-green-900 mb-2">搜索技巧</h3>
                    <ul class="text-green-800 space-y-1 text-sm">
                        <li>• 使用关键词进行精确搜索</li>
                        <li>• 可以搜索技术名称，如"JavaScript"</li>
                        <li>• 支持中英文混合搜索</li>
                    </ul>
                </div>
                <div class="flex justify-center">
                    <button onclick="closeModal()" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">知道了</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// 执行搜索
function performSearch(searchTerm) {
    if (!searchTerm.trim()) {
        alert('请输入搜索关键词');
        return;
    }
    
    // 执行实际搜索
    var searchResults = searchArticles(searchTerm);
    showSearchResults(searchTerm, searchResults);
}

// 搜索文章
function searchArticles(searchTerm) {
    var allArticles = [
        {
            title: '如何编写高质量的JavaScript代码',
            excerpt: '深入探讨JavaScript代码质量的重要性，并提供一系列实用的技巧和最佳实践。',
            date: '2023年10月26日',
            views: '1,234',
            comments: '12',
            tags: ['JavaScript', '编程', '最佳实践'],
            image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/150ccf40867759675adc689c8958c10c.png'
        },
        {
            title: '响应式网页设计：从入门到精通',
            excerpt: '从基础概念讲起，逐步深入到媒体查询、弹性布局、图片优化等高级技巧。',
            date: '2023年10月25日',
            views: '987',
            comments: '8',
            tags: ['Web开发', 'CSS', '响应式设计'],
            image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/ba34648cf78cb5d8a49bbca985ccf5c8.png'
        },
        {
            title: '云计算在前端部署中的应用实践',
            excerpt: '探讨如何利用云计算服务（如AWS S3, Netlify, Vercel等）高效部署前端应用。',
            date: '2023年10月24日',
            views: '756',
            comments: '15',
            tags: ['部署', '云计算', 'DevOps'],
            image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/4b3ba496b45f3c37025a8babb575ffe8.png'
        },
        {
            title: 'HTML5 语义化标签详解',
            excerpt: '了解HTML5语义化标签的重要性和使用方法，提升网页的可访问性和SEO效果。',
            date: '2023年10月23日',
            views: '654',
            comments: '7',
            tags: ['HTML', 'Web开发', 'SEO'],
            image: 'https://via.placeholder.com/400x300'
        },
        {
            title: 'CSS动画性能优化技巧',
            excerpt: '深入了解CSS动画的性能瓶颈，学习如何优化动画效果，提升用户体验。',
            date: '2023年10月22日',
            views: '543',
            comments: '9',
            tags: ['CSS', '性能优化', 'Web开发'],
            image: 'https://via.placeholder.com/400x300'
        },
        {
            title: 'Vue.js 3.0 新特性深度解析',
            excerpt: '全面解析Vue.js 3.0的新特性，包括Composition API、Teleport、Fragments等重要更新。',
            date: '2023年10月21日',
            views: '1,123',
            comments: '18',
            tags: ['JavaScript', 'Vue.js', '前端框架'],
            image: 'https://via.placeholder.com/400x300'
        },
        {
            title: 'React Hooks 最佳实践',
            excerpt: '深入理解React Hooks的使用场景和最佳实践，提升React应用的性能和可维护性。',
            date: '2023年10月20日',
            views: '876',
            comments: '13',
            tags: ['JavaScript', 'React', '前端框架'],
            image: 'https://via.placeholder.com/400x300'
        },
        {
            title: 'TypeScript 进阶指南',
            excerpt: '从基础到高级，全面掌握TypeScript的类型系统、装饰器、泛型等高级特性。',
            date: '2023年10月19日',
            views: '945',
            comments: '16',
            tags: ['JavaScript', 'TypeScript', '编程'],
            image: 'https://via.placeholder.com/400x300'
        }
    ];
    
    var term = searchTerm.toLowerCase();
    
    return allArticles.filter(article => 
        article.title.toLowerCase().includes(term) ||
        article.excerpt.toLowerCase().includes(term) ||
        article.tags.some(tag => tag.toLowerCase().includes(term))
    );
}

// 显示搜索结果
function showSearchResults(searchTerm, results) {
    var modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-4xl w-full m-4 p-6 max-h-80vh overflow-y-auto">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-900 flex items-center">
                    <i class="fas fa-search text-blue-600 mr-2"></i>
                    搜索结果
                </h2>
                <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="mb-4">
                <p class="text-gray-600">搜索 "${searchTerm}" 找到 ${results.length} 篇相关文章</p>
            </div>
            ${results.length > 0 ? `
                <div class="space-y-4">
                    ${results.map(article => `
                        <div class="border-b pb-4 last:border-b-0 cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition duration-300">
                            <div class="flex gap-4">
                                <img src="${article.image}" alt="${article.title}" class="w-24 h-24 object-cover rounded-lg flex-shrink-0">
                                <div class="flex-1">
                                    <h3 class="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600">${article.title}</h3>
                                    <p class="text-gray-600 text-sm mb-3">${article.excerpt}</p>
                                    <div class="flex items-center text-xs text-gray-500 space-x-4">
                                        <span><i class="fas fa-calendar-alt mr-1"></i>${article.date}</span>
                                        <span><i class="fas fa-eye mr-1"></i>${article.views} 阅读</span>
                                        <span><i class="fas fa-comments mr-1"></i>${article.comments} 评论</span>
                                    </div>
                                    <div class="flex flex-wrap gap-1 mt-2">
                                        ${article.tags.map(tag => `
                                            <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${tag}</span>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : `
                <div class="text-center py-12">
                    <i class="fas fa-search text-gray-300 text-6xl mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">未找到相关文章</h3>
                    <p class="text-gray-600 mb-4">试试其他关键词或浏览所有文章</p>
                    <button onclick="closeModal()" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                        浏览所有文章
                    </button>
                </div>
            `}
            <div class="flex justify-end mt-6">
                <button onclick="closeModal()" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">关闭</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const articleCards = document.querySelectorAll(".bg-gray-50");

  if (searchInput && articleCards.length > 0) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();

      articleCards.forEach(function (card) {
        const title = card.querySelector("h4").textContent.toLowerCase();
        const content = card.querySelector("p").textContent.toLowerCase();

        if (title.includes(searchTerm) || content.includes(searchTerm)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  }
});
