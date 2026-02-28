
document.getElementById('lotto-btn').addEventListener('click', () => {
    const frequentNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]; // 실제로는 더 많은 데이터가 필요합니다.
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
    lottoNumbersDiv.innerHTML = `<strong>추첨된 번호:</strong> ${[...generatedNumbers].join(', ')}`;
});
