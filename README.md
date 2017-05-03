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

1) upload / results routing
2) image upload page 1
3) error handling (lare image, wrong result from vision api, wrong result from google search, app crash due to error etc)
4) OVerall UI
5) search keyword finding logic - > text search + web entities + similar. Using scores
6) Yoda design / quotes (ester egg)
7) code compression / linting /cleanup
8) manual search -> did you mean suggestions (call results route again?)
9) loading / spinners (analysing image, loading search results)
10) Image size