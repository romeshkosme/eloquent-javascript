class Matrix {
    width;
    height;
    #content = [];
    constructor(width, height, element = (x,y) => undefined) {
        this.width = width;
        this.height = height;
        this.#content = [];

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.#content[y * this.width + x] = element(x, y);
            }
        }
    }

    get(x, y) {
        return this.#content[y * this.width + x];
    }

    set(x, y, value) {
        this.#content[y * this.width + x] = value;
    }
}

class MatrixIterator {
    #x; // width
    #y; // height
    #matrix;
    constructor(matrix) {
        this.#x = 0;
        this.#y = 0;
        this.#matrix = matrix;
    }

    next() {
        if (this.#y === this.#matrix.height) return {done: true};

        let value = {
            x: this.#x,
            y: this.#y,
            value: this.#matrix.get(this.#x, this.#y)
        }
        this.#x++;
        if (this.#x === this.#matrix.width) {
            this.#x = 0;
            this.#y++;
        }
        return {value, done: false};
    }
}

Matrix.prototype[Symbol.iterator] = function() {
    return new MatrixIterator(this);
}

const matrix = new Matrix(3, 2);

for (const iterator of matrix) {
    console.log(iterator);
}