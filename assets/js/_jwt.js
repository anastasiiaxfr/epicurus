//GENERATE JWT TOKEN
const getToken = async (token) => {

    const jwt = 'https://jwtecho.pixegami.io';
    const certStr =
        "-----BEGIN CERTIFICATE-----\nMIIDHTCCAgWgAwIBAgIJAOSiZ8/teEIgMA0GCSqGSIb3DQEBBQUAMDExLzAtBgNV\nBAMMJnNlY3VyZXRva2VuLnN5c3RlbS5nc2VydmljZWFjY291bnQuY29tMB4XDTIz\nMDUyMjA5MzkzMVoXDTIzMDYwNzIxNTQzMVowMTEvMC0GA1UEAwwmc2VjdXJldG9r\nZW4uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wggEiMA0GCSqGSIb3DQEBAQUA\nA4IBDwAwggEKAoIBAQDVa5tRVVAWGZFRze9/YQZcXyVXLjvyU+DK1EkmZwYOe30D\nsw/fov5g34upphGLYsN6oZAp8kjiRPUBUhdBodZfeIIfgbcAGsfQ0OLPeWliIq1S\npQb9e2j4c58bsb5uotqyBC2CAmNrBmU0ASYLYAVf/+gSzfZPNBrcYuWlf8/+P+9Z\nEMy/gWb/bUSrKxAasoDDLLxNWGYQ0omOPCQsjyQxdJlmYfgWetemJ442TLkNcJ9R\nBb0KkBu4QKaBBmheIb38/VnIMH2/oe21UsD4u4tJpYbqff8gAuU6ql8gXHlClYF0\nBpbx5W0l3hqlsUN43EFQcixTt+7jT3GrsERlQPw3AgMBAAGjODA2MAwGA1UdEwEB\n/wQCMAAwDgYDVR0PAQH/BAQDAgeAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMCMA0G\nCSqGSIb3DQEBBQUAA4IBAQDHsfCD+bnyOFZ2h0ETUss/EZgOjhEdklZwAI1OebgW\nhQ0neV33Fa4MNe2sIGMFCHPLLEY9KWaQPqz5asIiWB05NejSyzQsrv3Qll4/eUn1\nInnYGksFh/i5Bni6unem0Y7gik1Z9HFH7dFk82X2v8c+9F/44dXbbzIEDG430vn6\nVONeT3/bf8+B89hVqhjEufCIt7TohSG1Hy8I7ZbOHrKku5UpVpq0yfVXN7vh2vt8\nJLPAwYXQA+A2XbHRRPlvnKOTozPn57P+5X7W2WxCfh2Dr7f6dEy2E2yX+eoXW2gz\nbllJ13HWd00ZWtukwJU9I/GKh2JtTemWQ+5Hh48aBzEG\n-----END CERTIFICATE-----\n";
    const encodedCertStr = encodeURIComponent(certStr);
    const audience = projectId;

    const verifiToken = `${jwt}/verify?audience=${audience}&cert_str=${encodedCertStr}`;

    const decodeToken = `${jwt}/decode?audience=${audience}&cert_str=${encodedCertStr}`;

    const requestInfo = {
        headers: {
            Authorization: "Bearer " + token + "xx",
        }
    };
    const response = await fetch(jwt, requestInfo);
    const responseBody = await response.json();
    //console.log('responseBody', responseBody);

}

export { getToken }