// 文章相关功能模块

// 文章链接功能
function initArticleLinks() {
    var articleLinks = document.querySelectorAll('.bg-blue-600.hover\\:bg-blue-700, .bg-gray-200.hover\\:bg-gray-300');
    articleLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var linkText = this.textContent.trim();
            handleArticleLink(linkText);
        });
    });
    
    // 文章卡片点击
    var articleCards = document.querySelectorAll('.bg-gray-50');
    articleCards.forEach(function(card) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            // 如果点击的是按钮或链接，不触发卡片点击
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('button') || e.target.closest('a')) {
                return;
            }
            var articleTitle = this.querySelector('h4').textContent.trim();
            // TODO: 在这里添加新的文章查看方式
            alert('点击了文章: ' + articleTitle);
        });
    });
    
    // 文章标题点击
    var articleTitles = document.querySelectorAll('h4.text-2xl.font-semibold');
    articleTitles.forEach(function(title) {
        title.style.cursor = 'pointer';
        title.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡
            var articleTitle = this.textContent.trim();
            // TODO: 在这里添加新的文章查看方式
            alert('点击了文章标题: ' + articleTitle);
        });
    });
    
    // 归档链接点击
    var archiveLinks = document.querySelectorAll('.fas.fa-angle-right');
    archiveLinks.forEach(function(icon) {
        var link = icon.closest('a');
        if (link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                var archiveText = this.textContent.trim();
                showArchiveArticles(archiveText);
            });
        }
    });
    
    // 文章内标签链接点击
    var articleTagLinks = document.querySelectorAll('.fas.fa-tags');
    articleTagLinks.forEach(function(icon) {
        var tagContainer = icon.closest('.flex');
        if (tagContainer) {
            var tagLinks = tagContainer.querySelectorAll('a.hover\\:text-blue-600');
            tagLinks.forEach(function(tagLink) {
                tagLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    var tagName = this.textContent.trim();
                    filterByTag(tagName);
                });
            });
        }
    });
    
    // 评论数量点击
    var commentIcons = document.querySelectorAll('.fas.fa-comments');
    commentIcons.forEach(function(icon) {
        var commentSpan = icon.closest('span');
        if (commentSpan && commentSpan.textContent.includes('评论')) {
            commentSpan.style.cursor = 'pointer';
            commentSpan.addEventListener('click', function(e) {
                e.preventDefault();
                scrollToSection('最新评论');
            });
        }
    });
    
    // 日期图标点击
    var dateIcons = document.querySelectorAll('.fas.fa-calendar-alt');
    dateIcons.forEach(function(icon) {
        var dateSpan = icon.closest('span');
        if (dateSpan) {
            dateSpan.style.cursor = 'pointer';
            dateSpan.addEventListener('click', function(e) {
                e.preventDefault();
                var dateText = this.textContent.trim();
                showDateArticles(dateText);
            });
        }
    });
}

function handleArticleLink(linkText) {
    if (linkText.includes('阅读更多')) {
        showArticlePreview('探索前端的未来：WebAssembly与AI的融合');
    } else if (linkText.includes('查看所有文章')) {
        alert('正在跳转到文章列表页面...');
    }
}

function showArticlePreview(articleTitle) {
    var modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-2xl w-full m-4 p-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold">${articleTitle}</h2>
                <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="mb-4">
                <p class="text-gray-600 mb-4">这是一篇关于前端技术的深度文章，探讨了现代Web开发的最新趋势和技术实践。</p>
                <p class="text-gray-600 mb-4">文章涵盖了从基础概念到高级应用的全方位内容，适合各个层次的开发者阅读学习。</p>
                <p class="text-gray-600">通过实例和代码演示，帮助读者更好地理解和掌握相关技术。</p>
            </div>
            <div class="flex justify-end space-x-2">
                <button onclick="closeModal()" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">关闭</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// 标签筛选功能
function initTagFiltering() {
    var tags = document.querySelectorAll('.bg-blue-100, .bg-green-100, .bg-purple-100, .bg-yellow-100, .bg-red-100, .bg-indigo-100, .bg-pink-100, .bg-teal-100, .bg-orange-100');
    tags.forEach(function(tag) {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            var tagText = this.textContent.trim();
            filterByTag(tagText);
        });
    });
}

function filterByTag(tagName) {
    // 高亮选中的标签
    var allTags = document.querySelectorAll('.bg-blue-100, .bg-green-100, .bg-purple-100, .bg-yellow-100, .bg-red-100, .bg-indigo-100, .bg-pink-100, .bg-teal-100, .bg-orange-100');
    allTags.forEach(function(tag) {
        tag.classList.remove('ring-2', 'ring-gray-400', 'ring-offset-2');
    });
    
    event.target.classList.add('ring-2', 'ring-gray-400', 'ring-offset-2');
    
    // 显示筛选结果
    showTagFilterResults(tagName);
}

// 显示标签筛选结果
function showTagFilterResults(tagName) {
    var relatedArticles = getArticlesByTag(tagName);
    
    var modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-4xl w-full m-4 p-6 max-h-80vh overflow-y-auto">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold flex items-center">
                    <i class="fas fa-tag text-blue-600 mr-2"></i>
                    标签: ${tagName}
                </h2>
                <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="mb-4">
                <p class="text-gray-600">共找到 ${relatedArticles.length} 篇相关文章</p>
            </div>
            <div class="space-y-4">
                ${relatedArticles.map(article => `
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
            <div class="flex justify-end mt-6">
                <button onclick="closeModal()" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">关闭</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// 根据标签获取文章
function getArticlesByTag(tagName) {
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
            title: '前端工程化实践指南',
            excerpt: '从构建工具到代码规范，全面介绍前端工程化的最佳实践，提升开发效率和代码质量。',
            date: '2023年10月21日',
            views: '876',
            comments: '13',
            tags: ['工具', 'Web开发', '最佳实践'],
            image: 'https://via.placeholder.com/400x300'
        },
        {
            title: '用户体验设计的核心原则',
            excerpt: '探讨用户体验设计的基本原则，如何设计出更符合用户需求的产品界面。',
            date: '2023年10月20日',
            views: '432',
            comments: '6',
            tags: ['用户体验', 'Web开发', '设计'],
            image: 'https://via.placeholder.com/400x300'
        },
        {
            title: '现代JavaScript算法实现',
            excerpt: '介绍常用算法的JavaScript实现，包括排序、搜索、动态规划等经典算法。',
            date: '2023年10月19日',
            views: '789',
            comments: '11',
            tags: ['JavaScript', '算法', '编程'],
            image: 'https://via.placeholder.com/400x300'
        }
    ];
    
    // 根据标签筛选文章
    return allArticles.filter(article => 
        article.tags.some(tag => 
            tag.toLowerCase().includes(tagName.toLowerCase()) || 
            tagName.toLowerCase().includes(tag.toLowerCase())
        )
    );
}

// 显示归档文章
function showArchiveArticles(archiveText) {
    var modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-2xl w-full m-4 p-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold">${archiveText} 的文章</h2>
                <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="space-y-3">
                <div class="border-l-4 border-blue-500 pl-4">
                    <h3 class="font-semibold">如何编写高质量的JavaScript代码</h3>
                    <p class="text-gray-600 text-sm">2023年10月26日</p>
                </div>
                <div class="border-l-4 border-green-500 pl-4">
                    <h3 class="font-semibold">响应式网页设计最佳实践</h3>
                    <p class="text-gray-600 text-sm">2023年10月25日</p>
                </div>
                <div class="border-l-4 border-purple-500 pl-4">
                    <h3 class="font-semibold">前端性能优化技巧分享</h3>
                    <p class="text-gray-600 text-sm">2023年10月24日</p>
                </div>
            </div>
            <div class="flex justify-end mt-6">
                <button onclick="closeModal()" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">关闭</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// 显示指定日期的文章
function showDateArticles(dateText) {
    var modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-2xl w-full m-4 p-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold">${dateText} 发布的文章</h2>
                <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="text-center py-8">
                <i class="fas fa-calendar-alt text-gray-300 text-4xl mb-4"></i>
                <p class="text-gray-600">这一天发布的文章内容正在加载中...</p>
            </div>
            <div class="flex justify-end mt-6">
                <button onclick="closeModal()" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">关闭</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// 社交链接功能
function initSocialLinks() {
    // 社交链接已直接在HTML中设置了href和target属性
    console.log('Social links initialized');
}

// 评论回复功能
function initCommentReplies() {
    var replyLinks = document.querySelectorAll('.text-blue-600.hover\\:underline');
    replyLinks.forEach(function(link) {
        if (link.textContent.trim() === '回复') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                var commentDiv = this.closest('li');
                var commenterName = commentDiv.querySelector('.font-semibold').textContent.trim();
                showReplyForm(commenterName, commentDiv);
            });
        }
    });
}

function showReplyForm(commenterName, commentDiv) {
    // 检查是否已经有回复表单
    if (commentDiv.querySelector('.reply-form')) {
        return;
    }
    
    var replyForm = document.createElement('div');
    replyForm.className = 'reply-form mt-3 ml-16';
    replyForm.innerHTML = `
        <textarea placeholder="回复 ${commenterName}..." class="w-full p-2 border rounded-lg text-sm" rows="3"></textarea>
        <div class="mt-2 flex space-x-2">
            <button class="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700" onclick="submitReply(this)">发送</button>
            <button class="bg-gray-300 text-gray-700 px-4 py-1 rounded text-sm hover:bg-gray-400" onclick="cancelReply(this)">取消</button>
        </div>
    `;
    commentDiv.appendChild(replyForm);
}

// 添加文章展开/收起功能
function toggleArticleContent() {
    var articles = document.querySelectorAll('.line-clamp-3');
    articles.forEach(function(article) {
        article.style.cursor = 'pointer';
        article.addEventListener('click', function() {
            if (this.classList.contains('line-clamp-3')) {
                this.classList.remove('line-clamp-3');
                this.style.webkitLineClamp = 'unset';
            } else {
                this.classList.add('line-clamp-3');
                this.style.webkitLineClamp = '3';
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
  // 初始化文章交互功能
  initArticleInteractions();
  initLikeSystem();
  initShareButtons();
});

// 初始化文章链接、分类、归档等点击事件
function initArticleInteractions() {
  // 点击文章链接，显示文章详情
  document.querySelectorAll(".article-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const title = this.closest(".bg-gray-50").querySelector("h4").textContent;
      showArticle(title);
    });
  });

  // 点击分类链接
  document.querySelectorAll(".category-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      alert(`跳转到分类: ${this.textContent}`);
    });
  });

  // 点击标签链接
  document.querySelectorAll('.tag-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      alert('筛选标签: ' + this.textContent);
    });
  });

  // 点击归档链接
  document.querySelectorAll('.archive-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      showArchiveArticles(this.textContent);
    });
  });

  // 点击日历日期
  document.querySelectorAll('.date-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      showDateArticles(this.textContent);
    });
  });
}

// 显示文章详情弹窗
function showArticle(title) {
  const article = getArticleDetails(title);
  const modal = document.createElement("div");
  modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
  modal.innerHTML = `
    <div class="bg-white rounded-lg max-w-4xl w-full m-4 p-8 max-h-80vh overflow-y-auto">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold">${title}</h2>
        <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
      </div>
      <div class="text-sm text-gray-500 mb-4">
        <span><i class="fas fa-calendar-alt mr-1"></i> ${article.date}</span>
        <span class="ml-4"><i class="fas fa-eye mr-1"></i> ${article.views}</span>
        <span class="ml-4"><i class="fas fa-comments mr-1"></i> ${article.comments}</span>
        <span class="ml-4"><i class="fas fa-thumbs-up mr-1"></i> ${article.likes}</span>
      </div>
      <div class="prose max-w-none">${article.content}</div>
    </div>
  `;
  document.body.appendChild(modal);
}

// 获取文章详情（来自 blog.html 的完整模拟数据）
function getArticleDetails(title) {
    const articles = {
        '如何编写高质量的JavaScript代码': {
            date: '2023年10月26日',
            views: '1,523',
            comments: '32',
            likes: '128',
            content: `...`
        },
        '响应式网页设计：从入门到精通': {
            date: '2023年10月25日',
            views: '2,109',
            comments: '45',
            likes: '256',
            content: `...`
        },
        '云计算在前端部署中的应用实践': {
            date: '2023年10月24日',
            views: '987',
            comments: '18',
            likes: '92',
            content: `...`
        }
    };
    return articles[title] || { content: '未找到文章。' };
}

// 显示归档文章
function showArchiveArticles(archiveText) {
    alert(`显示归档: ${archiveText}`);
}

// 显示特定日期的文章
function showDateArticles(dateText) {
    alert(`显示日期: ${dateText}`);
}

// 初始化点赞系统 (来自 blog.html 的完整版本)
function initLikeSystem() {
    document.querySelectorAll('.bg-gray-50').forEach(card => {
        const metaDiv = card.querySelector('.flex.items-center.text-sm.text-gray-500');
        if (metaDiv && !metaDiv.querySelector('.like-btn')) {
            const likeButton = document.createElement('button');
            likeButton.innerHTML = '<i class="fas fa-heart text-gray-400"></i> <span>0</span>';
            likeButton.className = 'like-btn text-sm text-gray-500 hover:text-red-500 transition duration-300 ml-4';
            let isLiked = false;
            let likeCount = 0;
            likeButton.onclick = function() {
                if (!isLiked) {
                    likeCount++;
                    this.innerHTML = `<i class="fas fa-heart text-red-500"></i> <span>${likeCount}</span>`;
                    isLiked = true;
                } else {
                    likeCount--;
                    this.innerHTML = `<i class="fas fa-heart text-gray-400"></i> <span>${likeCount}</span>`;
                    isLiked = false;
                }
            };
            metaDiv.appendChild(likeButton);
        }
    });
}

// 初始化分享功能 (来自 blog.html 的完整版本)
function initShareButtons() {
    document.querySelectorAll('.bg-gray-50').forEach(card => {
        const metaDiv = card.querySelector('.flex.items-center.text-sm.text-gray-500');
        if (metaDiv && !metaDiv.querySelector('.share-btn')) {
            const shareButton = document.createElement('button');
            shareButton.innerHTML = '<i class="fas fa-share-alt"></i>';
            shareButton.className = 'share-btn text-sm text-gray-500 hover:text-blue-500 transition duration-300 ml-4';
            shareButton.title = '分享文章';
            shareButton.onclick = function() {
                const title = card.querySelector('h4').textContent;
                if (navigator.share) {
                    navigator.share({ title: title, text: `分享文章: ${title}`, url: window.location.href });
                } else {
                    alert('浏览器不支持Web Share API。');
                }
            };
            metaDiv.appendChild(shareButton);
        }
    });
}
