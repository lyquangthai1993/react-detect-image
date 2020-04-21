import axios from "axios";
import localForageApp from "localforage";

export const AxiosGet = async (url) => {
    try {
        const accessToken = await localForageApp.getItem("access_token");
        const response = await axios.get(url, {
            headers: {
                Authorization: "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });

        return { data: response.data, error: null };
    } catch (err) {
        return { data: null, error: err };
    }
};

/*import {useEffect, useState, useRef} from "react";
import axios from 'axios';

export const useAxiosGet = (url) => {
    const isCurrent = useRef(true);
    const[state, setState] = useState({ data: null, loading: true, error: null});

    useEffect(()=> {
        return() => {
            isCurrent.current = false;
        }
    }, []);

    useEffect(()=> {
        setState(state => ({data: state.data, loading: true, error: false}));

        axios.get(url, {
                headers: {
                    Auth: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Blcm1vYmlsLWRldi5hdS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWRjY2Q1M2UyMTljMmIwZWVmZTUxZGU5IiwiYXVkIjoiaHR0cHM6Ly9wZXJtb2JpbC1hcGktZGV2LnNhbGVzYXBwY2VudHJlLmNvLm56LyIsImlhdCI6MTU3NDAzOTM0MSwiZXhwIjoxNTc0MTI1NzQxLCJhenAiOiJUY0tvQ3JJR2hXbTV0Q3IyQVFKcVE1NHc5SjNNaTZnSyIsInNjb3BlIjoib2ZmbGluZV9hY2Nlc3MiLCJndHkiOiJwYXNzd29yZCIsInBlcm1pc3Npb25zIjpbImNyZWF0ZTpmZWVkYmFjayIsImNyZWF0ZTpoaXJlIiwiY3JlYXRlOmhpcmVfbm90ZSIsImNyZWF0ZTpoaXJlX3Byb2R1Y3QiLCJjcmVhdGU6aXNzdWVfcmVwb3J0IiwiY3JlYXRlOnBpY2t1cF9yZXF1ZXN0IiwiY3JlYXRlOnN1cHBvcnRfcmVxdWVzdCIsImNyZWF0ZTp1c2VyIiwicmVhZDphbGwiLCJyZWFkOmFsbF9wdWJsaWMiLCJyZWFkOmhpcmUiLCJ3cml0ZTphbGwiLCJ3cml0ZTpmYXVsdF9maXgiLCJ3cml0ZTpmaXhfbWlzbWF0Y2giLCJ3cml0ZTpoaXJlX3JlY2lldmUiLCJ3cml0ZTpoaXJlX3N0YXR1cyIsIndyaXRlOmhpcmVfdHJhbnNmZXIiLCJ3cml0ZTpyZXF1ZXN0X3Byb2R1Y3QiXX0.RCbFO_2HFBEpwnAU77KDMF75LS54ofOXzfbr9Ij9XOE",
                    'content-type': "application/json"
                }
            })
            .then(function (response) {

                

                if(isCurrent.current){
                    setState({data: response, loading: false, error: null});
                }
            })
            .catch(function (error) {
                

                if(isCurrent.current){
                    setState({data: null, loading: false, error: error.message});
                }
            })

    }, [url, setState]);

    return state;
}
*/
