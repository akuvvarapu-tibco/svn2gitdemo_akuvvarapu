var gtmID = "";
switch(document.domain) 
{
    case "docs.tibco.com":
    gtmID = "GTM-KNCF9SW"; 
    break;
    
    case "stag-docs.tibco.com":
    gtmID = "GTM-TZ4DPQH";
    break;
    
    case "integration.cloud.tibco.com":
    gtmID = "GTM-N47W99C"; 
    break;
    
    case "events.cloud.tibco.com":
    gtmID = "GTM-W47CBKS"; 
    break;
    
    case "account.cloud.tibco.com":
    gtmID = "GTM-MMHXWZ2";
    break;
    
    case "localhost":
    gtmID = "GTM-NX3VXRR";
    break;
    
    default:
    gtmID = "GTM-KNCF9SW";
}
        (
            function(w,d,s,l,i)
            {
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'})
                var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
            }
        )
        (window,document,'script','dataLayer',gtmID);

