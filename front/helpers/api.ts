export default class Api {  
    static async GET(url: string) {  
       const params = {
        url: url,
        method: "GET",
       };

       const res = await fetch("/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        });
           
       if (!res.ok) {
           throw new Error("API: Erreur lors de l'appel GET à l'URL " + url + " : " + res.status + " : " + res.statusText);
       }
   
       const result = await res.json();
       return result.data;
    }

    static async PUT(url: string, body: any) {  
        const params = {
            url: url,
            method: "PUT",
            body: body
        };
 
        const res = await fetch("/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
         });
            
        if (!res.ok) {
            throw new Error("API: Erreur lors de l'appel PUT à l'URL " + url + " : " + res.status + " : " + res.statusText);
        }
    
        const result = await res.json();
        return result.data;
    }

    static async PATCH(url: string, body: any) {  
        const params = {
            url: url,
            method: "PATCH",
            body: body
        };
 
        const res = await fetch("/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
         });
            
        if (!res.ok) {
            throw new Error("API: Erreur lors de l'appel PATCH à l'URL " + url + " : " + res.status + " : " + res.statusText);
        }
    
        const result = await res.json();
        return result.data;
    }  

    static async DELETE(url: string) {  
        const params = {
            url: url,
            method: "DELETE",
            body: {}
        };
 
        const res = await fetch("/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
         });
            
        if (!res.ok) {
            throw new Error("API: Erreur lors de l'appel DELETE à l'URL " + url + " : " + res.status + " : " + res.statusText);
        }
    
        const result = await res.json();
        return result;
    }  
}