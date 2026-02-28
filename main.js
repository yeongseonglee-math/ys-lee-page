// 로또 번호별 누적 출현 횟수 데이터 (1회 ~ 1213회 기준)
const lottoCounts = {
    1: 167, 2: 152, 3: 169, 4: 159, 5: 153, 6: 163, 7: 168, 8: 155, 9: 133, 10: 158,
    11: 164, 12: 177, 13: 174, 14: 169, 15: 162, 16: 166, 17: 169, 18: 172, 19: 165, 20: 167,
    21: 164, 22: 141, 23: 146, 24: 163, 25: 150, 26: 164, 27: 179, 28: 151, 29: 152, 30: 155,
    31: 164, 32: 141, 33: 172, 34: 181, 35: 161, 36: 162, 37: 171, 38: 169, 39: 165, 40: 172,
    41: 147, 42: 153, 43: 162, 44: 160, 45: 171
};

// 횟수를 기준으로 순위 계산 (동점자는 공동 순위 처리)
const calculateRanks = () => {
    const sorted = Object.entries(lottoCounts)
        .map(([num, count]) => ({ num: parseInt(num), count }))
        .sort((a, b) => b.count - a.count);
    
    let currentRank = 1;
    const ranks = {};
    for (let i = 0; i < sorted.length; i++) {
        if (i > 0 && sorted[i].count < sorted[i-1].count) {
            currentRank = i + 1;
        }
        ranks[sorted[i].num] = currentRank;
    }
    return ranks;
};

const lottoRanks = calculateRanks();

// TOP 10 데이터 추출 (표시용)
const lottoStats = Object.entries(lottoCounts)
    .map(([number, count]) => ({ number: parseInt(number), count, rank: lottoRanks[number] }))
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 10);

// 최다 빈도 리스트 렌더링
const rankingListDiv = document.getElementById('lotto-ranking-list');
if (rankingListDiv) {
    rankingListDiv.innerHTML = ''; // 기존 내용 삭제
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
    const generatedNumbers = new Set();
    const top10 = lottoStats.map(s => s.number);

    // 상위권 번호 중 3개 우선 추첨 (전략적)
    while (generatedNumbers.size < 3) {
        const randomIndex = Math.floor(Math.random() * top10.length);
        generatedNumbers.add(top10[randomIndex]);
    }

    // 나머지 3개 랜덤 추첨
    while (generatedNumbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        generatedNumbers.add(randomNumber);
    }

    const sortedNumbers = [...generatedNumbers].sort((a, b) => a - b);
    const lottoNumbersDiv = document.getElementById('lotto-numbers');
    
    let resultHTML = `<strong>추첨된 번호:</strong><br><div style="margin-top:20px; display: flex; justify-content: center; flex-wrap: wrap;">`;
    
    sortedNumbers.forEach(num => {
        const rank = lottoRanks[num];
        const isTop10 = rank <= 10;
        
        resultHTML += `
            <div style="text-align: center; margin: 10px;">
                <div style="
                    width:45px; height:45px; 
                    line-height:45px; 
                    border-radius:50%; 
                    background:${isTop10 ? 'var(--primary-green)' : '#777'}; 
                    color:white; 
                    font-weight:bold;
                    font-size: 1.1rem;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                    margin: 0 auto 8px;
                ">
                    ${num}
                </div>
                <div style="color: var(--primary-green); font-size: 0.85rem; font-weight: bold;">
                    ${rank}위
                </div>
            </div>`;
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
