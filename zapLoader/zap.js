console.log("tests")
chrome.tabs.getSelected(null,function(tab) {
    var domain = new URL(tab.url).hostname;
    // I don't trust this. Neither should you:
    var domainNoDubs = domain.match(/.*?([\w]+\.[\w]+)$/)[1];
    domainNoDubs = "." + domainNoDubs;
    console.log("domainNoDubs: ", domainNoDubs);
    var url = tab.url;
    console.log("Current url: ", url, ". Domain: ", domain, ". No www: ", domainNoDubs);
    chrome.cookies.getAll({domain: domainNoDubs}, function(cookies) {
    for(var i=0; i<cookies.length;i++) {
      console.log("Deleting ", cookies[i]);

      chrome.cookies.remove({url: url + cookies[i].domain  + cookies[i].path, name: cookies[i].name});
    }
  });
});

chrome.tabs.getSelected(null, function(tab) {
  var code = 'window.location.reload();';
  chrome.tabs.executeScript(tab.id, {code: code});
});