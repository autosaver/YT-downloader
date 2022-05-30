(() => {
  let youtubeRightControls;
  let currentVideo = "";

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;

    if (type === "NEW") {
      currentVideo = videoId;
      // console.log("NEW", videoId);
      newVideoLoaded(videoId);
    }
  });

  const newVideoLoaded = async () => {
    const bookmarkBtnExists =
      document.getElementsByClassName("bookmark-btn")[0];
    // console.log("button exists: ",bookmarkBtnExists);

    if (!bookmarkBtnExists) {
      const bookmarkBtn = document.createElement("img");

      bookmarkBtn.src = chrome.runtime.getURL("assets/download.png");
      bookmarkBtn.className ="ytp-button ytp-subtitles-button bookmark-btn"
      bookmarkBtn.style.width = "30px";
      bookmarkBtn.style.height = "30px";
      bookmarkBtn.style.padding = "5px";

      bookmarkBtn.title = "Click to Download";

      youtubeRightControls =await document.getElementsByClassName("ytp-right-controls")[0];
      youtubeRightControls.prepend(bookmarkBtn);
      bookmarkBtn.addEventListener("click", ()=>{window.open( "https://www.y2mate.com/youtube/"+currentVideo, "_blank")});
    }
  };

  newVideoLoaded();
})();

