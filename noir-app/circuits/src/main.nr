fn main(
    domain: [u8; 32],
    domainPub: pub str<8>,
    // age: Field,
    // minAgePub: pub Field,
    // maxAgePub: pub Field,
    region: [u8; 32],
    regionPub: pub str<8>,
    gender: [u8; 32],
    genderPub: pub str<8>,
    secret: [u8; 32],
    secretPub: pub str<8>
) {
    let domain_bytes = domainPub.as_bytes();
    let region_bytes = regionPub.as_bytes();
    let gender_bytes = genderPub.as_bytes();
    let secret_bytes = secretPub.as_bytes();

    let domainHash = dep::std::hash::sha256(domain_bytes);
    let regionHash = dep::std::hash::sha256(region_bytes);
    let genderHash = dep::std::hash::sha256(gender_bytes);
    let secretHash = dep::std::hash::sha256(secret_bytes);

    assert(domain == domainHash);
    assert(region == regionHash);
    assert(gender == genderHash);
    assert(secret == secretHash);
}
