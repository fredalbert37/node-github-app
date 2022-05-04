const fetch = require('node-fetch');
const dayjs = require('dayjs');
/**
 * It takes a page number and a date from the request parameters, then it calls the
 * getCommitsFromGithub function with those parameters, and then it sends the response back to the
 * client.
 * @param req - The request object.
 * @param res - the response object
 */

const getCommits = async (req, res) => {
    const { page, date } = req.params;
    const commitsJson = await getCommitsFromGithub(page, date);
    if(commitsJson.length > 0) {        
        const commits = commitsJson.map(c => ({
            sha: c.sha,
            message: c.commit.message,
            date: dayjs(c.commit.author.date).format("YYYY-MM-DD hh:mm:ss"),
            author: c.commit.author.name,
        }));
        
        // const orderedCommits = await orderJson(commits);
        res.status(200).json(commits);
    } else{
        res.status(404).json({
            message: 'No commits found for this date',
        });
    }

}

/* *|CURSOR_MARCADOR|* */
async function getCommitsFromGithub(page, date) {
    const url = `https://api.github.com/repos/fredalbert37/node-github-app/commits?page=${page}&since=${date}`;    
    return fetch(url)
        .then(response => response.json())
        .then(data => data);
}




module.exports = { getCommits };