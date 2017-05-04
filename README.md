# NewsVision
Searching news articles by image taken by mobile camera



Steps to see response:

1. npm install
2. node index.js
3. check console

# References 

https://cloud.google.com/vision/
https://codelabs.developers.google.com/codelabs/cloud-vision-nodejs/index.html?index=..%2F..%2Findex#0

http://jsbin.com/lenabuteya/edit?html,css,js,output

https://www.googleapis.com/customsearch/v1element?key=<API_KEY>&rsz=filtered_cse&num=10&hl=en&prettyPrint=false&source=gcsc&gss=.au&sig=584853a42cc2f90f5533642697d97114&cx=012148326047351459851:fgzrg0zysrs&q=donald%20trump%20white%20house&sort=&googlehost=www.google.com&callback=google.search.Search.apiary11793&nocache=1493611808375



To do:

x 1) upload / results routing
x 2) image upload page 1
3) (vijay) error handling (lare image, wrong result from vision api, wrong result from google search, app crash due to error, search for non-findable inputs, taking to long to respond etc)
4) OVerall UI
5) (vijay / kannan) search keyword finding logic - > text search + web entities + similar. Use scores if needed.
6) partial reloading - manual search -> did you mean suggestions (call results route again?)
7) loading / spinners (analysing image, loading search results)
8) partial reloading - filter by masthead <-- http://www.dailytelegraph.com.au/search-results?q=bruno+mars
11) Yoda design / quotes (ester egg)
12) code compression / linting /cleanup
13) Additional Google Cloud account
14) Reduce image file size for performance
15) Image orientation