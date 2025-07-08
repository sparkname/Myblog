// 图表功能模块

// 渲染文章分类统计图表
function renderCategoryChart() {
    var chartDom = document.getElementById('category-chart');
    if (chartDom) {
        var myChart = echarts.init(chartDom);
        var option = {
            title: {
                text: '文章分类统计',
                left: 'center',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'bold'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function(params) {
                    return params.name + '<br/>' + 
                           params.value + ' 篇文章 (' + params.percent + '%)';
                }
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                top: 'middle'
            },
            series: [
                {
                    name: '文章分类',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    center: ['60%', '50%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 8,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '16',
                            fontWeight: 'bold'
                        },
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { 
                            value: 8, 
                            name: 'JavaScript',
                            itemStyle: { color: '#3b82f6' }
                        },
                        { 
                            value: 6, 
                            name: 'Web开发',
                            itemStyle: { color: '#10b981' }
                        },
                        { 
                            value: 4, 
                            name: 'CSS',
                            itemStyle: { color: '#8b5cf6' }
                        },
                        { 
                            value: 3, 
                            name: '编程',
                            itemStyle: { color: '#f59e0b' }
                        },
                        { 
                            value: 2, 
                            name: '工具',
                            itemStyle: { color: '#ef4444' }
                        },
                        { 
                            value: 2, 
                            name: '其他',
                            itemStyle: { color: '#6b7280' }
                        }
                    ]
                }
            ]
        };
        
        myChart.setOption(option);
        
        // 添加点击事件
        myChart.on('click', function(params) {
            showCategoryDetails(params.name, params.value);
        });
        
        // 响应式处理
        window.addEventListener('resize', function() {
            myChart.resize();
        });
    }
}

// 显示分类详情
function showCategoryDetails(categoryName, categoryValue) {
    var modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-md w-full m-4 p-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold text-gray-900 flex items-center">
                    <i class="fas fa-chart-pie text-blue-600 mr-2"></i>
                    ${categoryName} 分类
                </h2>
                <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="space-y-4">
                <div class="text-center">
                    <div class="text-4xl font-bold text-blue-600 mb-2">${categoryValue}</div>
                    <div class="text-gray-600">篇相关文章</div>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h3 class="font-semibold text-gray-900 mb-2">分类描述</h3>
                    <p class="text-gray-600 text-sm">
                        ${getCategoryDescription(categoryName)}
                    </p>
                </div>
                <div class="flex justify-center space-x-2">
                    <button onclick="closeModal()" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">关闭</button>
                    <button onclick="filterByTag('${categoryName}')" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">查看文章</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// 获取分类描述
function getCategoryDescription(categoryName) {
    var descriptions = {
        'JavaScript': '包含JavaScript基础、高级特性、框架使用、最佳实践等相关内容。',
        'Web开发': '涵盖前端开发、后端开发、全栈开发等Web技术相关文章。',
        'CSS': '包括CSS基础、布局技巧、动画效果、预处理器等样式相关内容。',
        '编程': '编程思维、算法、数据结构、编程语言学习等通用编程知识。',
        '工具': '开发工具、构建工具、调试工具等提升开发效率的工具介绍。',
        '其他': '除了主要技术分类外的其他有趣或有用的技术内容。'
    };
    return descriptions[categoryName] || '该分类包含丰富的技术内容，值得深入学习。';
}

document.addEventListener("DOMContentLoaded", function () {
  // ECharts 图表初始化
  initCharts();
});

function initCharts() {
  // 访问量趋势图
  const trafficChart = echarts.init(document.getElementById("traffic-chart"));
  const trafficOption = {
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    yAxis: { type: "value" },
    series: [{ data: [820, 932, 901, 934, 1290, 1330, 1320], type: "line" }],
  };
  trafficChart.setOption(trafficOption);

  // 文章分类统计图
  const categoryChart = echarts.init(document.getElementById("category-chart"));
  const categoryOption = {
    tooltip: { trigger: "item" },
    legend: { top: "5%", left: "center" },
    series: [
      {
        name: "文章分类",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: { show: false, position: "center" },
        emphasis: {
          label: { show: true, fontSize: "20", fontWeight: "bold" },
        },
        labelLine: { show: false },
        data: [
          { value: 1048, name: "JavaScript" },
          { value: 735, name: "CSS" },
          { value: 580, name: "Vue.js" },
          { value: 484, name: "Node.js" },
          { value: 300, name: "其他" },
        ],
      },
    ],
  };
  categoryChart.setOption(categoryOption);

  // 窗口大小改变时，重绘图表
  window.addEventListener("resize", function () {
    trafficChart.resize();
    categoryChart.resize();
  });
}
