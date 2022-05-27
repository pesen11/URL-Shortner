function copyFunc() {
  /* Get the text field */
  console.log("Clicked");
  var copyText = document.getElementById("shortenedURL");

  /* Select the text field */
  copyText.select();

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);
}
