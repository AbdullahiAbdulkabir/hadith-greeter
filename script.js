const hadiths = [
    "The best among you are those who have the best manners and character. (Bukhari)",
    "Actions are judged by intentions. (Bukhari & Muslim)",
    "None of you truly believes until he loves for his brother what he loves for himself. (Bukhari & Muslim)",
    "He who is not grateful to people is not grateful to Allah. (Abu Dawood)"
];

async function fetchIslamicDate() {
    try {
        const response = await fetch("https://api.aladhan.com/v1/gToH");
        const data = await response.json();
        const hijri = data.data.hijri;
        return `${hijri.day} ${hijri.month.en} ${hijri.year}`;
    } catch (error) {
        console.error("Error fetching Islamic date:", error);
        return "Unable to fetch Islamic date";
    }
}

async function fetchRandomNatureImage() {
    try {
        const response = await fetch("https://api.pexels.com/v1/search?query=nature&per_page=1", {
            headers: { Authorization: "Strd57H8p4Fuco6Xa9kz3Txi1OPS0XOdH0TEZb6zKkeqL5tsPzcW0kem" }
        });
        const data = await response.json();
        return data.photos[0].src.landscape;
    } catch (error) {
        console.error("Error fetching image:", error);
        return "images/default.jpg";
    }
}


chrome.storage.sync.get("name", async (data) => {
    if (!data.name) {
        const userName = prompt("Enter your name:");
        chrome.storage.sync.set({ name: userName });
        showGreeting(userName);
    } else {
        showGreeting(data.name);
    }
});

async function showGreeting(name) {
    const today = new Date().getDate() % hadiths.length;
    const imageUrl = await fetchRandomNatureImage();
    const islamicDate = await fetchIslamicDate();

    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.getElementById("date").textContent = islamicDate;
    document.getElementById("greeting").textContent = `As-Salamu Alaykum, ${name}`;
    document.getElementById("hadith").textContent = hadiths[today];
}
