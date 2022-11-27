var HIC2Sam = {
    convert: function() {}
};

(HIC2Sam => {

    HIC2Sam.convert = function() {
        var source = $('#HICContent').val();

        var result = source
                    // remove link to parent page: [Parent Page^]
                    .replace(/\[(.*?)\^\]/g,"")

                    // remove "see also" block: {SEE ALSO}
                    .replace(/\{SEE ALSO\}/gi,"")
                    
                    // remove escaping block: <esc>abcd</esc>
                    .replace(/\<esc\>(.*?)\<\/esc\>/gi,"$1")
                    
                    // change line breaks
                    .replace(/{br}/gi,"[BR]")
                    
                    // change bold: '''bold text''' => **bold text**
                    .replace(/\'\'\'(.*?)\'\'\'/g,'**$1**')
                    
                    // change italic: ''italic text'' => _/italic text/_
                    .replace(/\'\'(.*?)\'\'/g,"_/$1/_")
                    
                    // header 4: =====title===== => [H4] title
                    .replace(/=====(.*?)=====/g,"[H4] $1")
                    
                    // header 3: ====title==== => [H3] title
                    .replace(/====(.*?)====/g,"[H3] $1")
                    
                    // header 2: ===title=== => [H2] title
                    .replace(/===(.*?)===/g,"[H2] $1")
                    
                    // header 1: ==title== => [H1] title
                    .replace(/==(.*?)==/g,"[H1] $1")
                    
                    // code block: split by lines, each line beginning with 2 blanks  
                    .replace(/\{\{\{\{((.|\n)*?)\}\}\}\}/g, (block) => {
                        block = block.replace("{{{{","").replace("}}}}","");
                        var lines = block.split("\n");
                        result = "";
                        lines.forEach(line => {
                            result += "  " + line + "\n";
                        });
                        return result;
                    })
                    
                    // inline code: {{inline code}} => ++inline code++
                    .replace(/\{\{(.*?)\}\}/g,"++$1++")

                    // bulletted list
                    .replace(/\<ul\>((.|\n)*?)\<\/ul\>/gi, (list) => {
                        list = list.replace(/\<ul\>/gi,"").replace(/\<\/ul\>/gi,"");
                        return list.replace(/\<li\>((.|\n)*?)\<\/li\>/gi,"* $1");
                    })
                    

        $("#SamContent").text(result);
    }

})(HIC2Sam);