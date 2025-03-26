/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
  
      // CPU Table
      .createTable("cpu", table => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("socket").notNullable();
        table.integer("cores").notNullable();
        table.integer("threads").notNullable();
        table.float("base_clock_speed").notNullable(); // GHz
        table.float("boost_clock_speed");
        table.integer("wattage").notNullable(); // Previously TDP
        table.integer("l2_cache").notNullable();
        table.integer("l3_cache").notNullable();
        table.string("memory_type").notNullable();
        table.boolean("is_fan_included").defaultTo(false);
      })
  
      // GPU Table
      .createTable("gpu", table => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("interface").notNullable();
        table.integer("wattage").notNullable(); // Previously power_draw
        table.float("core_clock").notNullable();
        table.float("boost_clock");
        table.boolean("sli_crossfire").defaultTo(false);
        table.boolean("frame_sync").defaultTo(false);
        table.integer("num_dvi_ports").defaultTo(0);
        table.integer("num_hdmi_ports").defaultTo(0);
        table.integer("num_mini_hdmi_ports").defaultTo(0);
        table.integer("num_display_ports").defaultTo(0);
        table.string("cooling").notNullable();
        table.boolean("external_power").defaultTo(false);
        table.string("size").notNullable();
      })
  
      // Motherboard Table
      .createTable("motherboard", table => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("socket").notNullable();
        table.string("chipset").notNullable();
        table.string("size").notNullable();
        table.string("memory_type").notNullable();
        table.integer("max_memory").notNullable();
        table.integer("num_ram_slots").notNullable();
        table.integer("num_m2_slots").notNullable();
        table.integer("num_pcie_x16_slots").notNullable();
        table.integer("num_sata_slots").notNullable();
      })
  
      // RAM Table
      .createTable("ram", table => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("memory_type").notNullable();
        table.integer("capacity").notNullable(); // GB
        table.integer("speed").notNullable(); // MHz
        table.float("cas_latency").notNullable();
        table.float("first_word_latency").notNullable();
      })
  
      // Storage Table
      .createTable("storage", table => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("interface").notNullable();
        table.integer("capacity").notNullable(); // GB or TB
        table.string("size").notNullable(); // Physical size
        table.integer("cache").notNullable();
      })
  
      // Power Supply Table
      .createTable("power_supply", table => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.integer("wattage").notNullable();
        table.boolean("modular").defaultTo(false);
        table.boolean("fanless").defaultTo(false);
        table.integer("eps_atx_connectors").defaultTo(0);
        table.integer("pcie_12vhpwr_connectors").defaultTo(0);
        table.integer("pcie_12pin_connectors").defaultTo(0);
        table.integer("pcie_8pin_connectors").defaultTo(0);
        table.integer("pcie_6_2pin_connectors").defaultTo(0);
        table.integer("pcie_6pin_connectors").defaultTo(0);
        table.integer("sata_connectors").defaultTo(0);
        table.integer("molex_4pin_connectors").defaultTo(0);
      })
  
      // Case Table
      .createTable("case", table => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("size").notNullable();
      })
  
      // Cooling Table
      .createTable("cooling", table => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("size").notNullable();
        table.string("bearing").notNullable();
        table.string("cpu_socket").notNullable();
        table.boolean("water_cooled").defaultTo(false);
        table.boolean("fanless").defaultTo(false);
        table.float("noise_level").notNullable(); // dB
        table.integer("fan_speed").notNullable(); // RPM
      })
  
      // Price Table
      .createTable("price", table => {
        table.increments("id").primary();
        table.string("component_type").notNullable(); // CPU, GPU, etc.
        table.integer("component_id").notNullable();
        table.float("price").notNullable();
        table.string("store").notNullable();
        table.string("link").notNullable(); // Added link field for price source
      });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists("price")
      .dropTableIfExists("cooling")
      .dropTableIfExists("case")
      .dropTableIfExists("power_supply")
      .dropTableIfExists("storage")
      .dropTableIfExists("ram")
      .dropTableIfExists("motherboard")
      .dropTableIfExists("gpu")
      .dropTableIfExists("cpu");
  };
