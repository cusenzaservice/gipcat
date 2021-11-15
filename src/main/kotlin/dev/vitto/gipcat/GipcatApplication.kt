package dev.vitto.gipcat

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class GipcatApplication

fun main(args: Array<String>) {
    runApplication<GipcatApplication>(*args)
}
