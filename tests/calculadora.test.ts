class Calculadora {
    public somar(x: number, y: number) {
        return x + y;
    }
}

describe("Testes da classe Calculadora", () => {
    test("deve retornar 10 quando somar 5 com 5", () => {
        // 1 - SUT
        const calculadora = new Calculadora();

        // 2- chamar o método
        const result = calculadora.somar(5, 5);

        // 3 - asserts
        expect(result).toBeDefined();
        expect(result).toBe(10);
        expect(result).toBeGreaterThan(0);
    });
});
