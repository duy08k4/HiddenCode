function md5(input) {
    // Convert input string to UTF-8 array
    function stringToUtf8Bytes(input) {
        let bytes = [];
        for (let i = 0; i < input.length; i++) {
            let charcode = input.charCodeAt(i);
            if (charcode < 0x80) bytes.push(charcode);
            else if (charcode < 0x800) {
                bytes.push(0xc0 | (charcode >> 6),
                           0x80 | (charcode & 0x3f));
            } else if (charcode < 0xd800 || charcode >= 0xe000) {
                bytes.push(0xe0 | (charcode >> 12),
                           0x80 | ((charcode>>6) & 0x3f),
                           0x80 | (charcode & 0x3f));
            } else {
                i++;
                charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                                     | (input.charCodeAt(i) & 0x3ff));
                bytes.push(0xf0 | (charcode >>18),
                           0x80 | ((charcode>>12) & 0x3f),
                           0x80 | ((charcode>>6) & 0x3f),
                           0x80 | (charcode & 0x3f));
            }
        }
        return bytes;
    }

    // Padding and length conversion functions
    function padBytes(bytes) {
        const padded = bytes.concat([0x80]);
        while (padded.length % 64 !== 56) {
            padded.push(0);
        }
        const length = input.length * 8;
        for (let i = 0; i < 8; i++) {
            padded.push((length >>> (i * 8)) & 0xff);
        }
        return padded;
    }

    // Constants
    const K = [
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
        0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
        0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
        0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
        0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
        0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
        0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
        0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
        0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ];

    // Initialize variables
    let H0 = 0x67452301;
    let H1 = 0xefcdab89;
    let H2 = 0x98badcfe;
    let H3 = 0x10325476;

    // Convert input string to UTF-8 bytes
    const bytes = stringToUtf8Bytes(input);

    // Append padding and length
    const padded = padBytes(bytes);

    // Process each 512-bit block
    for (let i = 0; i < padded.length; i += 64) {
        const block = padded.slice(i, i + 64);

        // Initialize hash value for this block
        let [A, B, C, D] = [H0, H1, H2, H3];

        // Main loop
        for (let j = 0; j < 64; j++) {
            let f, g;
            if (j < 16) {
                f = (B & C) | ((~B) & D);
                g = j;
            } else if (j < 32) {
                f = (D & B) | ((~D) & C);
                g = (5*j + 1) % 16;
            } else if (j < 48) {
                f = B ^ C ^ D;
                g = (3*j + 5) % 16;
            } else {
                f = C ^ (B | (~D));
                g = (7*j) % 16;
            }

            const temp = D;
            D = C;
            C = B;
            B = B + ((A + f + K[j] + block[g]) << 0);
            A = temp;
        }

        // Update hash values
        H0 += A;
        H1 += B;
        H2 += C;
        H3 += D;
    }

    // Combine hash values
    const result = new Uint8Array([
        (H0 >> 24) & 0xff, (H0 >> 16) & 0xff, (H0 >> 8) & 0xff, H0 & 0xff,
        (H1 >> 24) & 0xff, (H1 >> 16) & 0xff, (H1 >> 8) & 0xff, H1 & 0xff,
        (H2 >> 24) & 0xff, (H2 >> 16) & 0xff, (H2 >> 8) & 0xff, H2 & 0xff,
        (H3 >> 24) & 0xff, (H3 >> 16) & 0xff, (H3 >> 8) & 0xff, H3 & 0xff
    ]);

    // Convert result to hex string
    let hash = '';
    for (let i = 0; i < result.length; i++) {
        const hex = result[i].toString(16);
        hash += (hex.length === 1 ? '0' : '') + hex;
    }

    return hash;
}

export {md5}