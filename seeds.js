const mongoose      = require('mongoose'),
      Content = require('./models/content');
      Comment = require('./models/comments');
var articles = [
  {
    name:"Asus ROG Gaming Laptop",
    imageUrl:"http://www.techalone.com/wp-content/uploads/2016/04/Asus-ROG-Gaming-Laptops.jpg",
    description:"The Republic of Gamers is committed to producing the most innovative hardcore PC performance hardware, enabling the ultimate computing experience for gamers and enthusiasts worldwide.\nThe STRIX lineup represents ROG's eSports-focused lightweight laptops with outstanding value. The new Titanium model steps up to a 7th-generation Core™ i7 CPU and upgrades the display to a blazing-fast 120Hz refresh rate."
  },
  {
    name:"iMac 2017",
    imageUrl:"https://support.apple.com/content/dam/edam/applecare/images/en_US/mac/macfamily-productnav-imac_2x.png",
    description:"Faster and more powerful than ever, iMac is now equipped with seventh-generation Intel Core i5 and i7 processors and the latest high-performance graphics. Storage kicks into high gear as well, with the speedy and spacious Fusion Drive now available in standard configurations of both the 27-inch and 21.5-inch Retina models. So you can do everything you love to do on iMac. All at maximum velocity."
  },
  {
    name:"Galaxy Note 8",
    imageUrl:"https://i.ytimg.com/vi/fddIl8UGFvE/hq720.jpg",
    description:"Samsung not having to change much in terms of design or hardware shows just how clearly it nailed the Galaxy S8 and S8+. With the exception of the Note 8's slightly more bulbous corners and generally squared-off frame, this is the same aluminum-and-glass build so many have been holding for the past six months — and it still works. It works damn well. And importantly for Samsung, it just builds its branding as another tall, tiny-bezeled phone that pushes both this phone and the Galaxy S8 series concurrently."
  },
  {
    name:"One Plus 5",
    imageUrl:"http://drop.ndtv.com/TECH/product_database/images/620201794031PM_635_oneplus_5.jpeg",
    description:"OnePlus 5 smartphone was launched in June 2017. The phone comes with a 5.50-inch touchscreen display with a resolution of 1080 pixels by 1920 pixels. OnePlus 5 price in India starts from Rs. 32,999. The OnePlus 5 is powered by 1.9GHz octa-core Qualcomm Snapdragon 835 processor and it comes with 6GB of RAM. The phone packs 64GB of internal storage cannot be expanded. As far as the cameras are concerned, the OnePlus 5 packs a 20-megapixel primary camera on the rear and a 16-megapixel front shooter for selfies.The OnePlus 5 runs Android 7.1.1 and is powered by a 3300mAh non removable battery. It measures 154.20 x 74.10 x 7.25 (height x width x thickness) and weigh 153.00 grams."
  },
  {
    name:"Acer Predator",
    imageUrl:"https://www.gamecrate.com/sites/default/files/field/image/acer-predator-desktop-g6-skylake-review-3.jpg",
    description:"Acer on Tuesday launched its Aspire VX 15 gaming laptop and Predator G1 gaming desktop in India. The company also updated its Predator notebook line up and introduced Predator 15 G9- 593 and Predator 17 G9-793 laptops for the country. The Acer Aspire VX 15 has been priced by the company at Rs. 87,999 and has been made available online on Flipkart and through Acer retail stores. On the other hand, Predator G1 Desktop has been made available through Acer's exclusive stores and leading retail chain "
  }
];

var removeAll = () => {
    Content.remove({},(err,content) =>{
      if(err){
        console.log(err);
      }
      else {
        console.log("Content Removed!!!");

        articles.forEach((article) => {
          Content.create(article,(err,content) => {
            if(err){
              console.log(err);
            }
            else {
              //Create a comment
              Comment.create({
                text:"Awesome!",
                author:"Adi"
              },(err,comment) => {
                if (err) {
                  console.log(err);
                }else {
                  content.comments.push(comment);
                  content.save();
                  // console.log("Created Comment!");
                }
              })
            }
          });
        });

      }
    });
};
module.exports = removeAll;
