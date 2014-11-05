var spawn = require('child_process').spawn

var projectPath = "",
    renderComps = [],
    execPath = "",
    compCount= 0;

var renderComp = function(i){
    var renderArgs = [
                "-project", projectPath,
                "-comp", renderComps[i]
                //"-OMtemplate", 'H.264',
            ];
    console.log('starting ' + renderComps[i]);
    var aerender = spawn(execPath, renderArgs);

    aerender.stdout.on('data', function(data) {
        console.log('aerender stdout: ' + data);
        if (data.toString().indexOf('Finished composition') != -1) {
            console.log(renderComps[compCount] + ' successfully rendered');
            compCount++; //idk why just in case
            return renderComp((i++))
        }
    });

    aerender.stderr.on('data', function(data) {
        console.log('aerender stderr: ' + data);
    });

    aerender.on('close', function(code) {
        console.log('aerender child process exited with code ' + code);
    });
}
