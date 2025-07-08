// 主JavaScript文件 - 初始化和协调各模块

// 初始化所有功能
document.addEventListener('DOMContentLoaded', function () {
    console.log('博客系统初始化开始...');
    
    // 初始化基础功能
    initMobileMenu();
    initKeyboardEvents();
    initBackToTop();
    initThemeToggle();
    
    // 初始化导航功能
    initNavigationMenu();
    initSectionIcons();
    
    // 初始化搜索功能
    initSearchFunction();
    
    // 初始化文章相关功能
    initArticleLinks();
    initTagFiltering();
    initCommentReplies();
    initSocialLinks();
    toggleArticleContent();
    
    // 初始化交互功能
    initLikeSystem();
    initShareButtons();
    
    // 初始化图表
    renderCategoryChart();
    
    console.log('博客系统初始化完成！');
});

// 定义要劫持的属性（保留原有的自定义功能）
var ytCustomProperties = ['textContent', 'innerText'];
ytCustomProperties.forEach(function (prop) {
    // 这里可以添加自定义属性劫持逻辑
});

// 保存原生方法
var nativeElementQuerySelector = Element.prototype.querySelector;
var nativeDocumentQuerySelector = Document.prototype.querySelector;

function ytCustomQuerySelector(selector) {
    // 自定义查询逻辑
    if (this === document) {
        return nativeDocumentQuerySelector.call(this, selector);
    } else {
        return nativeElementQuerySelector.call(this, selector);
    }
}

// 重写原生的querySelector
Document.prototype.querySelector = ytCustomQuerySelector;
Element.prototype.querySelector = ytCustomQuerySelector;

var nativeElementInsertBefore = Element.prototype.insertBefore;

function ytCustomInsertBefore(newNode, referenceNode) {
    // 自定义插入逻辑
    return nativeElementInsertBefore.call(this, newNode, referenceNode);
}

// 重写原生 insertBefore 方法
Element.prototype.insertBefore = ytCustomInsertBefore;

// 需要给新添加的a标签跳转链接加入一些必要的样式 保证加入后不影响原来的布局
function addUniqueStyle(cssText) {
    var style = document.createElement('style');
    style.textContent = cssText;
    document.head.appendChild(style);
}

addUniqueStyle('.yt-a-defalut-link[custom-a="true"] > * { margin:0;flex:1; }');

// 页面性能监控
window.addEventListener('load', function() {
    console.log('页面加载完成时间:', performance.now(), 'ms');
    
    // 添加渐入动画
    document.body.classList.add('fade-in');
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面发生错误:', e.error);
});

// 导出主要函数到全局作用域（为了兼容内联事件处理器）
window.renderCategoryChart = renderCategoryChart;
window.initSearchFunction = initSearchFunction;
window.initNavigationMenu = initNavigationMenu;
window.initArticleLinks = initArticleLinks;
window.filterByTag = filterByTag;
