import { describe, expect, it } from 'bun:test';
import { createSecureUrl } from '../src/domain';

describe('createSecureUrl', () => {
    it('should return an empty string for an undefined value', () => {
        expect(createSecureUrl(undefined)).toBe('');
    });

    it('should return an empty string for a null value', () => {
        expect(createSecureUrl(null)).toBe('');
    });

    it('should return an empty string for an empty string', () => {
        expect(createSecureUrl('')).toBe('');
    });

    it('should return an empty string for a whitespace string', () => {
        expect(createSecureUrl('   ')).toBe('');
    });

    it('should add https to a domain without a protocol', () => {
        expect(createSecureUrl('fluxly.dev')).toBe('https://fluxly.dev');
    });

    it('should convert http to https', () => {
        expect(createSecureUrl('http://fluxly.dev')).toBe('https://fluxly.dev');
    });

    it('should keep an existing https protocol', () => {
        expect(createSecureUrl('https://fluxly.dev')).toBe('https://fluxly.dev');
    });

    it('should handle domains with paths and queries', () => {
        expect(createSecureUrl('fluxly.dev/path?query=1')).toBe('https://fluxly.dev/path?query=1');
    });

    it('should handle www subdomains', () => {
        expect(createSecureUrl('www.fluxly.dev')).toBe('https://www.fluxly.dev');
    });

    it('should trim whitespace from the url', () => {
        expect(createSecureUrl('  http://fluxly.dev/path ')).toBe('https://fluxly.dev/path');
    });

    it('should return an empty string for an invalid url string', () => {
        expect(createSecureUrl('this is not a url')).toBe('');
    });

    it('should return an empty string for a url that only contains a protocol', () => {
        expect(createSecureUrl('http://')).toBe('');
    });

    it('should handle other protocols and convert them to https', () => {
        expect(createSecureUrl('ftp://fluxly.dev')).toBe('https://fluxly.dev');
    });

    it('should return an empty string for a url that does not contain a domain', () => {
        expect(createSecureUrl('a')).toBe('');
    });
});
