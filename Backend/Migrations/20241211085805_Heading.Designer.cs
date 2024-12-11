﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PrologV7;

#nullable disable

namespace Backend.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20241211085805_Heading")]
    partial class Heading
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.0");

            modelBuilder.Entity("PrologV7.Models.Post", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Color")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Content")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("CreationDate")
                        .HasColumnType("TEXT");

                    b.Property<int?>("Heading")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Height")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("ModificationDate")
                        .HasColumnType("TEXT");

                    b.Property<int>("Span")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Status")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Tags")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Posts");
                });
#pragma warning restore 612, 618
        }
    }
}
