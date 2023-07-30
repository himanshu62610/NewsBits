import React, { Component } from 'react'
import Newscomponent from './Newscomponent'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
//import InfiniteScroll from "react-infinite-scroll-component";
//npm install --save react-infinite-scroll-component
//from codesandbox --infintescroll bar
export default class News extends Component {
    static defaultProps={
       country:'in',
       pagesize:15,
      category:'general'
    }
    static propTypes={
      country:PropTypes.string,
      pagesize:PropTypes.number,
      category:PropTypes.string,
    }
  //articles ek array leke aao jisme news content ho

  /*articles=[
    {
    /*  "source": {
      "id": null,
      "name": "Biztoc.com"
      },
      "author": "thestreet.com",
      "title": "Tesla Rival Chevy Rolls Out Electric Version of a Classic Model",
      "description": "Get Free Report first introduced its Cybertruck electric pickup prototype in November 2019, it was described as a vehicle similar to one in the films \"Mad Max\" and \"Blade Runner.\" CEO Elon Musk said the development of the Cybertruck was influenced by the amph…",
      "url": "https://biztoc.com/x/fe01ef6fda8b9ffd",
      "urlToImage": "https://c.biztoc.com/p/fe01ef6fda8b9ffd/s.webp",
      "publishedAt": "2023-07-01T20:36:07Z",
      "content": "Get Free Report first introduced its Cybertruck electric pickup prototype in November 2019, it was described as a vehicle similar to one in the films \"Mad Max\" and \"Blade Runner.\" CEO Elon Musk said … [+293 chars]"
      },
      {
      "source": {
      "id": null,
      "name": "Biztoc.com"
      },
      "author": "newsweek.com",
      "title": "Elon Musk places \"temporary limits\" on unverified Twitter accounts",
      "description": "Elon Musk announced \"temporary limits\" on all Twitter accounts as tens of thousands of the social media giant's users reported outages on Saturday. Musk—whose purchase of the social media company last year has come under significant scrutiny amid an increase …",
      "url": "https://biztoc.com/x/d1f6db9823a82b6c",
      "urlToImage": "https://c.biztoc.com/p/d1f6db9823a82b6c/s.webp",
      "publishedAt": "2023-07-01T20:26:02Z",
      "content": "Elon Musk announced \"temporary limits\" on all Twitter accounts as tens of thousands of the social media giant's users reported outages on Saturday.Muskwhose purchase of the social media company last … [+296 chars]"
      },
      {
      "source": {
      "id": null,
      "name": "Minneapolis Star Tribune"
      },
      "author": "Tamia Fowlkes and Julian Mark, The Washington Post",
      "title": "Elon Musk sets new daily Twitter limits for users",
      "description": "Follow the StarTribune for the news, photos and videos from the Twin Cities and beyond.",
      "url": "https://www.startribune.com/twitter-elon-musk-sets-new-daily-limits/600286857/",
      "urlToImage": "https://chorus.stimg.co/24765464/merlin_71173697.jpg?h=630&w=1200&fit=crop&bg=999&crop=faces",
      "publishedAt": "2023-07-01T19:41:28Z",
      "content": "Elon Musk announced Saturday that Twitter will temporarily limit the number of tweets users can read per day depending on whether they are paid subscribers - to combat computer programs that comb thr… [+1060 chars]"
      
      }
  ]
  */
  //sabse phle constructor call hota hai
  //uske baad render hoti hai files
  //uske hai componentdidmount call hota hai


  //to run loop in jsx
  constructor(){
    //constructor se state set kar rahe hai
    super();
    console.log("hello i am constructor from news component");
    this.state={
      articles:this.articles,
      loading:false,
      page:1,
      totalResults:0
      //jo kuch bhi constructor ke andar defined hai use (this.state.var_name)  se acces karenef
    }
  }
  
  //use fetch api to popualte news
  //url se news fetch kar rahe hai
  async newsfunc(){
    this.props.setProgress(10);
    //let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apikey=${this.props.apikey}&category=${this.props.category}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`
    this.setState({loading:true});
    let data= await fetch(url);
    this.props.setProgress(30);
    let parsedData=await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles:parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false,
    })
    this.props.setProgress(100);
  }
  async componentDidMount(){
   this.newsfunc();
  }
  //
  handlePreviousclick=async()=>{
    //sabse phle page-1(prev) ke url ko hit karneg
    //phir baad me page ki value ko update kar denge;
    //page ke value ko variable define kiya hai
    //pagesize ki value ko props ki tarah define kiya hai
    this.setState({page:this.state.page-1});
   this.newsfunc();
  }
  handleNextclick=async()=>{
     //sabse phle page+1(next) ke url ko hit karneg
    //phir baad me page ki value ko update kar denge;
    /*if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pagesize)){
    }*/
    //math.ceil is a function jo 1.8 ya 1.2 ko round up kar deta hai 2 me

    //`${var_name}`   aise var deinne karte hai {this.props.var_name}aise props define karte hai
    //page constructor ke andar deine hai isliye use   this.state.   se acces kar rahe hai
    
  this.setState({page:this.state.page+1});
   this.newsfunc();
  }
fetchMoreData=async()=>{
  this.setState({page:this.state.page+1});
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&category=${this.props.category}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
  this.setState({loading:true});
  let data= await fetch(url);
  let parsedData=await data.json();
  console.log(parsedData);
  this.setState({
    articles:this.state.articles.concate(parsedData.articles),
    totalResults:parsedData.totalResults,
    loading:false
  })
}
  //div class=row me ek div class=col-md-3/4 bana lena 
  //ek row me ab jitne col div banoge utne column ban jayenge
  render(){
    return (
        <div className="container my-3"  >
          <h2 className="text-center" style={{margin:'35px 0px',marginTop:'90px'}}>Newsmonkey-Top {this.props.category} Headlines</h2>
      {this.state.loading&&<Spinner/>}{/* component ko use karne ke liye use phle import karna padega*/}
    
          <div className="row my-3">
            {/* !this.state.loading&&*/}
            {this.state.articles?.map((element)=>{
           return  <div className="col-md-3" key={element.url}>
              <Newscomponent title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,80):""} imageurl={element.urlToImage?element.urlToImage:"https://m.economictimes.com/thumb/msid-99712676,width-1589,height-1180,resizemode-4,imgsize-244654/rcb-vs-rr-ipl-2023-match-why-virat-kohlis-team-wears-green-jersey-every-year.jpg"} newsurl={element.url} />
              </div>
            })} 
            </div>            
        <div className="my-3">{/* my-3 se vertcal spacing aa jati hai  bootstarp ki class hai*/}
         {/*bootsrap flex box se button ko left aur right me allign kiya hai*/} <div class="d-flex justify-content-between">

        <button disabled={this.state.page<=1} type="button"  className="btn btn-dark" onClick={this.handlePreviousclick}>&larr;Previous</button>{/*html arrow code  &larr; */}
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pagesize)} type="button" className="btn btn-dark" onClick={this.handleNextclick}>Next&rarr;</button>
        </div>
        </div>
        </div>
    )
  }
}
/*
<InfiniteScroll
            dataLength = {this.state.articles.length}
            next = {this.fetchMoreData}
            hasMore = {this.state.articles.length!==this.state.totalResults}//hasmore indicate pura data fetch hua ki nahi
            loader={<Spinner/>}
            >
 
   </InfiniteScroll>*/