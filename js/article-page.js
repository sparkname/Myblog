document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleTitle = urlParams.get('title');

    const article = articles.find(a => a.title === articleTitle);

    if (article) {
        document.getElementById('article-title').textContent = article.title;
        
        const metaContainer = document.getElementById('article-meta');
        metaContainer.innerHTML = `
            <span><i class="fas fa-calendar-alt mr-1"></i>${article.date}</span>
            <span><i class="fas fa-tags mr-1"></i>${article.tags.join(', ')}</span>
            <span><i class="fas fa-comments mr-1"></i>${article.comments} 评论</span>
        `;

        const imageContainer = document.getElementById('article-image-container');
        if (article.image) {
            imageContainer.innerHTML = `<img src="${article.image}" alt="${article.title}" class="w-full h-auto rounded-lg mb-8">`;
        }

        document.getElementById('article-content').innerHTML = article.content;
        document.title = article.title; // Set the page title
    } else {
        const articleContainer = document.querySelector('.article-container');
        articleContainer.innerHTML = `
            <a href="index.html" class="back-link"><i class="fas fa-arrow-left mr-2"></i>返回首页</a>
            <h1 class="article-title">文章未找到</h1>
            <p class="article-content">抱歉，我们没有找到您要查找的文章。</p>
        `;
    }
});
