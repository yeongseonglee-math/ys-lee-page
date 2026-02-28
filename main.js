// 로또 번호 추첨 로직
document.getElementById('lotto-btn').addEventListener('click', () => {
    const frequentNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const generatedNumbers = new Set();

    // 빈도수 높은 번호 중 4개 추첨
    while (generatedNumbers.size < 4) {
        const randomIndex = Math.floor(Math.random() * frequentNumbers.length);
        generatedNumbers.add(frequentNumbers[randomIndex]);
    }

    // 랜덤 번호 2개 추첨
    while (generatedNumbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        generatedNumbers.add(randomNumber);
    }

    const lottoNumbersDiv = document.getElementById('lotto-numbers');
    lottoNumbersDiv.innerHTML = `<strong>추첨된 번호:</strong> ${[...generatedNumbers].sort((a, b) => a - b).join(', ')}`;
});

// 다크 모드 토글 로직
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// 초기 테마 설정 확인
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
