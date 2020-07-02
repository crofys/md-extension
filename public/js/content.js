const Strategy = {
  juejin: () => {
    const title = $(".article-title").text();
    const content = $(".article-content").html();
    return {
      title,
      content
    };
  },
  lagou: () => {
    const title = $(".main-title").text();
    const content = $(".main-container").html();
    return {
      title,
      content
    };
  },
  // github_issues: () => {
  //   const title = $(".js-issue-title").text();
  //   const content = $(".markdown-body").html();
  //   return {
  //     title,
  //     content
  //   };
  // },
  other: ({ body }) => {
    const title = $(body.title).text();
    const content = $(body.content).html();
    return {
      title,
      content
    };
  }
};
console.log("执行了");

$(function() {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
    const { type } = request || {};
    if (Strategy[type]) {
      const data = Strategy[type](request);
      console.log("获得到:", data);
      sendResponse(data);
    }
  });
});
