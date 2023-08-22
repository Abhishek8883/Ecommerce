class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr
    }


    search() {
        const keyword = this.queryStr.keyword ?
            {
                productName: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                }
            } : {};
        this.query = this.query.find({ ...keyword })
        return this;
    }

    filter(){
        const queryCopy = {...this.queryStr}

        //removing some field for category
        const removeFields = ["keyword","page","limit"];
        removeFields.forEach(key => delete queryCopy[key]);


        //price and rating filter
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)  => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr))
        return this; 
    }

    pagination(resultPerPage){

        const limit = this.queryStr.limit || resultPerPage;
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = limit*(currentPage - 1);

        this.query = this.query.limit(limit).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;  