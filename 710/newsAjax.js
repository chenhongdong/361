(function () {
    function ajax() {
        let args = arguments[0],
            ajaxOpts = {
                type: args.type || 'GET',
                url: args.url || '',
                data: args.data || null,
                async: args.data || 'true',
                dataType: args.dataType || 'text',
                success: args.success || function() {},
                error: args.error || function() {},
                beforeSend: args.beforeSend || function() {},
                contentType: args.contentType || 'application/x-www-form-urlencoded',
                callback: args.callback || function() {}
            },
            xhr = null;

        ajaxOpts.beforeSend();

        xhr = new XMLHttpRequest();
        xhr.responseType = ajaxOpts.dataType;

        xhr.open(ajaxOpts.type, ajaxOpts.url, ajaxOpts.async);
        xhr.setRequestHeader('Content-Type', ajaxOpts.contentType);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    ajaxOpts.success(xhr.response);
                } else {
                    ajaxOpts.error();
                }
            }
        };

        ajaxOpts.data = JSON.stringify(ajaxOpts.data);
        xhr.send(formatData(ajaxOpts.data));
    }

    function formatData(data) {
        if (typeof data === 'object') {
            let result = '';

            for (let i in data) {
                result += `${i}=${data[i]}&`;
            }
            result = result.substring(0, result.length - 1);

            return result;
        } else {
            return data;
        }
    }

    window.ajax = ajax;
}());

