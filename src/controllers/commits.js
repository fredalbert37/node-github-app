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
    const commits = await getCommitsFromGithub(page, date);
    res.json(commits);
}

/* *|CURSOR_MARCADOR|* */
async function getCommitsFromGithub(page, date) {
    const url = `https://api.github.com/repos/facebook/react/commits?page=${page}&since=${date}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => data);
}




module.exports = { getCommits };