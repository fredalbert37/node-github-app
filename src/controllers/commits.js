const fetch = require('node-fetch');



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
    
    const commits = commitsJson.map(commit => {
        return {
            sha: commit.sha,
            message: commit.commit.message,
            date: commit.commit.author.date,
            author: commit.commit.author.name,
        }
    });

    res.status(200).json(commits);
}

/* *|CURSOR_MARCADOR|* */
async function getCommitsFromGithub(page, date) {
    const url = `https://api.github.com/repos/${process.env.USERNAME}/${process.env.REPO}/commits?page=${page}&since=${date}`;    
    return fetch(url)
        .then(response => response.json())
        .then(data => data);
}




module.exports = { getCommits };