import { Document, Query } from 'mongoose';

interface QueryParams{
  [key:string] : string
}

class APIFeatures <T extends Document>{

  query: Query<T[], T>;
  queryString: QueryParams;

  constructor(query: Query<T[], T>, queryString :QueryParams){
    this.query = query;
    this.queryString = queryString
  }

  filter(){
    const queryObj = {...this.queryString};
    const excludeFields = ["sort","page","limit","fields"];
    excludeFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort(){
    if(this.queryString.sort){
      if(typeof this.queryString.sort !== 'string') return;
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    }else{
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields(){
    if(this.queryString.fields){
      if(typeof this.queryString.fields !== 'string') return;
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields)
    }else{
      this.query = this.query.select('-__v');
    }
  
    return this;
  }

  paginate(){
    // pagination
    let page = 1;
    let limit = 100;
    if(this.queryString.page && this.queryString.limit){
      page = +this.queryString.page;
      limit = +this.queryString.limit;
    }  
    const skip = (page - 1) * limit;
  
    this.query = this.query.skip(skip).limit(limit);
  
    return this;
  }
}

export default APIFeatures;