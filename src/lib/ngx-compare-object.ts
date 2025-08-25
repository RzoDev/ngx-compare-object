
export class NgxCompareObject<T> {

  private _obj: string;

    /**
     * Set initial object to compare
     * @param initialObject 
     */
    constructor(initialObject: T){
        this._obj = JSON.stringify(initialObject);
    }
    
    /**
     * Compare if passed object is same to the initial object
     * @param object
     * @returns boolean
     */
    isSame(object: object): boolean{
        return this._obj==JSON.stringify(object);
    }

    /**
     * Returns the original object
     * @returns T
     */
    getOriginal(): T{
        return JSON.parse(this._obj);
    }
}
