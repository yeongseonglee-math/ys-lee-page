// 로또 번호 데이터 (1회 ~ 1212회 기준 최다 빈도 TOP 10)
const lottoStats = [
    { rank: 1, number: 34, count: 181 },
    { rank: 2, number: 27, count: 178 },
    { rank: 3, number: 12, count: 177 },
    { rank: 4, number: 13, count: 174 },
    { rank: 5, number: 18, count: 172 },
    { rank: 6, number: 33, count: 172 },
    { rank: 7, number: 40, count: 172 },
    { rank: 8, number: 37, count: 171 },
    { rank: 9, number: 45, count: 171 },
    { rank: 10, number: 3, count: 169 }
];

// 최다 빈도 리스트 렌더링
const rankingListDiv = document.getElementById('lotto-ranking-list');
if (rankingListDiv) {
    lottoStats.forEach(item => {
        const div = document.createElement('div');
        div.style.padding = '5px 10px';
        div.style.borderBottom = '1px solid rgba(0,0,0,0.05)';
        div.innerHTML = `<strong>${item.rank}위:</strong> ${item.number}번 (${item.count}회)`;
        rankingListDiv.appendChild(div);
    });
}

// 로또 번호 추첨 로직
document.getElementById('lotto-btn').addEventListener('click', () => {
    const frequentNumbers = lottoStats.map(s => s.number);
    const generatedNumbers = new Set();

    // 빈도수 높은 번호 중 3개 우선 추첨 (전략적 선택)
    while (generatedNumbers.size < 3) {
        const randomIndex = Math.floor(Math.random() * frequentNumbers.length);
        generatedNumbers.add(frequentNumbers[randomIndex]);
    }

    // 나머지 3개는 완전 랜덤 추첨
    while (generatedNumbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        generatedNumbers.add(randomNumber);
    }

    const sortedNumbers = [...generatedNumbers].sort((a, b) => a - b);
    const lottoNumbersDiv = document.getElementById('lotto-numbers');
    
    // 결과 출력 및 빈도수 포함 여부 표시
    let resultHTML = `<strong>추첨된 번호:</strong><br><div style="margin-top:10px;">`;
    sortedNumbers.forEach(num => {
        const isFrequent = frequentNumbers.includes(num);
        const rank = isFrequent ? lottoStats.find(s => s.number === num).rank : null;
        
        resultHTML += `
            <span style="
                display:inline-block; 
                width:40px; height:40px; 
                line-height:40px; 
                border-radius:50%; 
                background:${isFrequent ? 'var(--primary-green)' : '#777'}; 
                color:white; 
                margin:5px; 
                font-weight:bold;
                position:relative;
            ">
                ${num}
                ${isFrequent ? `<small style="position:absolute; top:-15px; left:50%; transform:translateX(-50%); color:var(--primary-green); font-size:0.7rem;">${rank}위</small>` : ''}
            </span>`;
    });
    resultHTML += `</div>`;
    
    lottoNumbersDiv.innerHTML = resultHTML;
});

// 다크 모드 토글 로직
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeToggle.textContent = '라이트 모드';
    }
}

themeToggle.addEventListener('click', () => {
    let theme = body.getAttribute('data-theme');
    
    if (theme === 'dark') {
        body.removeAttribute('data-theme');
        themeToggle.textContent = '다크 모드';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '라이트 모드';
        localStorage.setItem('theme', 'dark');
    }
});
