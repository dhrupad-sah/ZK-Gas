fn main(
    domain: [u8; 32],
    region: [u8; 32],
    gender: [u8; 32],
    domainPub: pub str<8>,
    // age: Field,
    // minAgePub: pub Field,
    // maxAgePub: pub Field,
    regionPub: pub str<8>,
    genderPub: pub str<8>
) {
    let domain_bytes = domainPub.as_bytes();
    let region_bytes = regionPub.as_bytes();
    let gender_bytes = genderPub.as_bytes();

    let domainHash = dep::std::hash::sha256(domain_bytes);
    let regionHash = dep::std::hash::sha256(region_bytes);
    let genderHash = dep::std::hash::sha256(gender_bytes);

    assert(domain == domainHash);
    assert(region == regionHash);
    assert(gender == genderHash);
}

#[test]
fn test_valid() {
    let domainPub = "xx@iiits";

    let regionPub = "xxxxxxAP";

    let genderPub = "xxxxxxxM";

    let domain_bytes = domainPub.as_bytes();
    let region_bytes = regionPub.as_bytes();
    let gender_bytes = genderPub.as_bytes();

    let domainHash = dep::std::hash::sha256(domain_bytes);
    let regionHash = dep::std::hash::sha256(region_bytes);
    let genderHash = dep::std::hash::sha256(gender_bytes);

    // let call = main(domainHash, domainPub, regionHash, regionPub, genderHash, genderPub, secretHash, secretPub);

    dep::std::println(domainHash);
    dep::std::println(regionHash);
    dep::std::println(genderHash);
}
