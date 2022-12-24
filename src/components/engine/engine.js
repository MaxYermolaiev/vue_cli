class ApiError extends Error {
    constructor(message, code) {
        super(message);
        this.name = "ApiError";
        this.message = message;
        this.code = code;
    }
}

class Engine {
    constructor(mode) {
        this.mode = mode;
        this.end_point = (mode === "dev") ? "http://localhost:3000/api" : "https/";
    }
    //if exist token and id assign it to use in request
    #token=null;
    #_id=null;

    request = async (url, method = "GET", body = null, headers = {},credential=false) => {
        headers['Content-type'] = 'application/json';
        if(credential&&this.#token&&this.#_id){headers['x-token'] = this.#token}

        if (body !== null) {
            body = this.toJSON(body);
            headers['Content-type'] = 'application/json';
        }
        let response = await fetch(`${this.end_point}/${url}`, {method, body, headers});

        if (!response.ok) {
            const {message} = await response.json();
            const {status} = response;
            throw new ApiError(this.mode === "dev" ? `Response status ${status}, error message - ${message}` : `Error message - ${message}`,status);
        }
        return await response.json();
    }

    //base
    fromBase64=(data)=>atob(data);
    toBase64=(data)=>btoa(data);

    //values validators
    testEmail=(str)=>/^([A-Za-z0-9])+@([A-Za-z0-9_])+\.([A-Za-z]{2,4})$/.test(str);
    testPassword=(str)=> /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]){8,32}/.test(str);
    testPhone=(str)=> /^(\+380)(99|50|95|66|93|96|97|63)([0-9]){7}/.test(str)&&str.length===13;
    testString=(str)=> /([A-Za-z]){2,32}/.test(str);

    //json transform
    toJSON = (data) => JSON.stringify(data);
    fromJSON = (data) => JSON.parse(data);

    //local storage tune and methods
    #storeName = "user";
    setStorage({token,_id}) {
        this.#token=token;
        this.#_id=_id;
        localStorage.setItem(this.#storeName, this.toJSON({token,_id}));
    }
    clearUserData() {
        this.#token=null;
        this.#_id=null;
        localStorage.clear();
    }
    getStorageData() {
        let credentials = this.fromJSON(localStorage.getItem(this.#storeName));
        if(credentials===null){
            this.#token=null;
            this.#_id=null;
            return {token:null,_id:null}
        }
        this.#token=credentials.token;
        this.#_id=credentials._id;
        return {...credentials};
    }
}

const engine = new Engine("dev");
export {engine, ApiError};