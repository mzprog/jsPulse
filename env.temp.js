//---------------------------------------
// You should copy this file to env.js
// Then You should sett your configuration
//---------------------------------------

export default {


    //---------------------------------------
    // Main Data
    //---------------------------------------

    PORT : 9090,
    SITE_URL : "http://localhost/",
    SITE_TITLE : "jsPulse",
    // use one of these ['production','development','maintenance']
    ENVIROMENT : "development",


    //---------------------------------------
    // DATABASE
    //---------------------------------------

    DB_TYPE : "mysql",

    M_DB_HOST : "localhost",
    M_DB_NAME : "",
    M_DB_USER : "root",
    M_DB_PASS : "",


    //---------------------------------------
    // ENCRYPTION
    //---------------------------------------

    // Change your encryption to be more secure
    ENC_KEY : "JaNdRgUkXp2s5v8y/A?D(G+KbPeShVmY",
    ENC_IV64 : "QAYNH1fb/Fq/bDc87WjxOQ::",
    ENC_CIPHER : "AES-128-CBC",

}