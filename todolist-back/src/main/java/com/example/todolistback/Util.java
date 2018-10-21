package com.example.todolistback;

public final class Util {

    private Util() {
    }

    // enumClassから、valueに合致するenum定数を返します。
    public static <T, E extends Enum<E> & IReturnValue<T>> E getEnum(Class<E> enumClass, T value) {

        E[] enumConstants = enumClass.getEnumConstants();

        for (E enumConstant : enumConstants) {
            T returnValue = enumConstant.getValue();
            if (returnValue.equals(value)) {
                return enumConstant;
            }
        }

        return null;
    }
}
