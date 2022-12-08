const crypto = require("crypto");
const { describe, expect, test } = require('@jest/globals')
const { deterministicPartitionKey } = require('./deterministicPartitionKey')

describe('deterministicPartitionKey function should', () => {
    test('on null event expect trivial hash', () => {
        const event = null
        const hash = deterministicPartitionKey(event);
        console.log('Null event hash: ', hash);
        expect(hash).toBe('0');
    });

    test('on giving empty event expecting same hash as of empty object', () => {
        const event = {}
        const hash = deterministicPartitionKey(event);
        const emptyObjHash = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
        expect(hash).toBe(emptyObjHash);
    });

    test('on giving event without partitionKey expecting same hash as of the given object', () => {
        const event = { name: 'pratik' }
        const hash = deterministicPartitionKey(event);
        const emptyObjHash = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
        expect(hash).toBe(emptyObjHash);
    });

    test('on giving string as partitionKey expecting same partitionKey back', () => {
        const event = { partitionKey: 'pratik' }
        expect(deterministicPartitionKey(event)).toBe(event.partitionKey);
    });

    test('on giving number as partitionKey expecting same number string as hash', () => {
        const event = { partitionKey: 100000 }
        expect(deterministicPartitionKey(event)).toBe(`${event.partitionKey}`);
    });

    test('on giving partition key as large object whose string size will be greater than 256 expect hash of that string', () => {
        const event = {
            partitionKey: {
                name: 'pratik',
                description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`
            }
        }
        const partitionObjHash = crypto.createHash("sha3-512").update(JSON.stringify(event.partitionKey)).digest("hex");
        expect(deterministicPartitionKey(event)).toBe(partitionObjHash);
    });

    test('on giving null as partitionKey expecting same event object hash', () => {
        const event = { partitionKey: null }
        const emptyObjHash = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
        expect(deterministicPartitionKey(event)).toBe(emptyObjHash);
    });
});