export const home = async (req, res) =>{   
    res.render('home', {
        title: 'User Management',
        csrfToken: req.csrfToken()
    });
}