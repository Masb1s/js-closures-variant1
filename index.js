function createCounter(initial = 0) {
    let count = initial;
    return {
        increment() { count++; return count; },
        decrement() { count--; return count; },
        get() { return count; },
        reset() { count = initial; return count; }
    };
}

//Limited Counter
function createLimitedCounter(min, max) {
    let value = min;
    return {
        increment() { if (value < max) value++; return value; },
        decrement() { if (value > min) value--; return value; },
        get() { return value; }
    };
}

//Step Counter
function createStepCounter(step = 1) {
    let value = 0;
    return {
        inc() { value += step; return value; },
        dec() { value -= step; return value; },
        get() { return value; }
    };
}

//Memoization
function memoize(fn) {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

function memoizeExpiring(fn, ttlMs) {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        const now = Date.now();

        if (cache.has(key)) {
            const { value, expires } = cache.get(key);
            if (now < expires) return value;
        }

        const result = fn(...args);
        cache.set(key, { value: result, expires: now + ttlMs });
        return result;
    };
}

//Fibonacci for Benchmark
function fib(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

const memoFib = memoize(fib);
//PRACTICAL 9.1 — VARIANT 1
//Named Counter with history
function createNamedCounter(name, initial = 0) {
    let count = initial;
    const history = [];

    function log(action) {
        history.push({ action, value: count, timestamp: Date.now() });
    }

    return {
        increment() { count++; log("inc"); return count; },
        decrement() { count--; log("dec"); return count; },
        get() { return count; },
        getHistory() { return [...history]; },
        getName() { return name; }
    };
}

// PRACTICAL 9.2 — VARIANT 1

function memoizeWith(fn, keyFn) {
    const cache = new Map();
    return (...args) => {
        const key = keyFn(...args);
        if (cache.has(key)) return cache.get(key);
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

function memoizeAsync(fn) {
    const cache = new Map();
    return async (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = await fn(...args);
        cache.set(key, result);
        return result;
    };
}

function memoizeExpiringAdvanced(fn, ttl) {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        const now = Date.now();

        if (cache.has(key)) {
            const { value, expires } = cache.get(key);
            if (now < expires) return value;
        }

        const result = fn(...args);
        cache.set(key, { value: result, expires: now + ttl });
        return result;
    };
}