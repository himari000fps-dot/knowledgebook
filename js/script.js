document.addEventListener('DOMContentLoaded', function() {
    // 獲取所有需要操作的元素
    const filterTags = document.querySelectorAll('.filter-tag'); // 篩選按鈕
    const knowledgeCards = document.querySelectorAll('.knowledge-card'); // 卡片
    const searchInput = document.getElementById('search-input'); // 搜尋框
    const gridContainer = document.querySelector('.knowledge-grid'); // 卡片

    // 篩選
    
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            // 執行篩選
            filterCards(filterValue, searchInput.value);
        });
    });

    // 搜尋

    searchInput.addEventListener('input', function() {
        // 選中的篩選標籤
        const activeTag = document.querySelector('.filter-tag.active');
        const filterValue = activeTag ? activeTag.getAttribute('data-filter') : 'all';
        
        // 執行篩選
        filterCards(filterValue, this.value);
    });


    // 篩選函數 Tag篩選和搜尋

    function filterCards(category, searchTerm) {
        const normalizedSearchTerm = searchTerm.trim().toLowerCase(); // 搜尋文字
        let visibleCount = 0; // 計算卡片數
        
        knowledgeCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category'); // 卡片分類
            const cardTitle = card.querySelector('.card-snippet').textContent.toLowerCase(); // 卡片摘要內容
            
            // 檢查是否符合分類
            const categoryMatch = (category === 'all' || cardCategory === category);
            
            // 檢查是否符合搜尋關鍵字
            const searchMatch = cardTitle.includes(normalizedSearchTerm);
            
            // 必須同時符合分類和搜尋
            if (categoryMatch && searchMatch) {
                // 顯示卡片 (利用 CSS 的 fade-in/fade-out 效果)
                card.classList.remove('hidden-card');
                // 讓卡片自己跑到最前面
                gridContainer.prepend(card.closest('.card-link'));
                visibleCount++;
            } else {
                // 隱藏卡片
                card.classList.add('hidden-card');
            }
        });

        // 當沒有卡片時，顯示提示訊息
        if (visibleCount === 0) {
        }
    }

    // 初始化頁面 載入時所有卡片都是可見的
    filterCards('all', '');
});