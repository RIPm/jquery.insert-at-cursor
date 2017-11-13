(function ($, document, window, undefined) {
    var DATANAME = 'shadonghongCaret';

    var saveSelection =  function() {
        if(window.getSelection) {
            /*主流的浏览器，包括chrome、Mozilla、Safari*/
            var sel = window.getSelection();
            if(sel.rangeCount > 0) {
                return sel.getRangeAt(0);
            }
        } else if(document.selection) {
            /*IE下的处理*/
            return document.selection.createRange();
        }
        return null;
    }

    var initCursor = function(dom) {
        $(dom).off('mouseup keyup').on('mouseup keyup', function() {
            //selectedRange = saveSelection();
            $(this).data(DATANAME, saveSelection());
        });
        $(dom).each(function() {
            if(!$(this).hasfocus) {
                console.log(1)
                $(this).focus();
                var range = saveSelection();
                range.selectNodeContents(this);
                range.collapse(false);
                $(this).data(DATANAME, range);
                $(this).blur();
            }
        });
    };

    $.initCursor = initCursor;

    $.fn.insertAtCursor = function (text) {
        return this.each(function () {
            var input = this, scrollPos, strPosStart = 0, strPosEnd = 0, isModernBrowser = ("selectionStart" in input && "selectionEnd" in input), before, after, range, selection, node;

            if (!((input.tagName && input.tagName.toLowerCase() === "textarea") || (input.tagName && input.tagName.toLowerCase() === "input" && input.type.toLowerCase() === "text"))) {

                if(!$(input).hasfocus) {
                    $(input).focus();
                }

                if (window.getSelection && window.getSelection().getRangeAt) {
                    range = $(input).data(DATANAME) || (
                        initCursor(input),
                        $(input).data(DATANAME)
                    );
                    range.collapse(false);
                    console.log(range);
                    node = range.createContextualFragment(text);

                    var c = node.lastChild;

                    range.insertNode(node);

                    if(c){
                        range.setEndAfter(c);
                        range.setStartAfter(c);
                    }

                    var j = window.getSelection();
                    j.removeAllRanges();
                    j.addRange(range);

                } else if (document.selection && document.selection.createRange) {
                    document.selection.createRange().pasteHTML(text);
                }
            }else {
                scrollPos = input.scrollTop;

                if (isModernBrowser) {
                    strPosStart = input.selectionStart;
                    strPosEnd = input.selectionEnd;
                } else {
                    input.focus();
                    range = document.selection.createRange();
                    range.moveStart('character', -input.value.length);
                    strPosStart = range.text.length;
                }

                if (strPosEnd < strPosStart)
                    strPosEnd = strPosStart;

                before = (input.value).substring(0, strPosStart);
                after = (input.value).substring(strPosEnd, input.value.length);
                input.value = before + text + after;
                strPosStart = strPosStart + text.length;

                if (isModernBrowser) {
                    input.selectionStart = strPosStart;
                    input.selectionEnd = strPosStart;
                } else {
                    range = document.selection.createRange();
                    range.moveStart('character', strPosStart);
                    range.moveEnd('character', 0);
                    range.select();
                }

                input.scrollTop = scrollPos;
            }
        });
    };
})(jQuery, document, window);
