fn main(
    domain: Field,
    region: Field,
    gender: Field,
    domainPub: pub Field,
    regionPub: pub Field,
    genderPub: pub Field
) {
    assert(domain == domainPub);
    assert(region == regionPub);
    assert(gender == genderPub);
}

#[test]
fn test_valid() {
    let domainPub = 0x7878406969697473;

    let regionPub = 0x7878787878784150;

    let genderPub = 0x787878787878784d;

    let domain = 0x7878406969697473;

    let region = 0x7878787878784150;

    let gender = 0x787878787878784d;

    let call = main(domain, region, gender, domainPub, regionPub, genderPub);
}
